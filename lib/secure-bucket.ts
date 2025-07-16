import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface SecureBucketProps {
  projectId: string;
  enableVersioning?: boolean;
  enableEncryption?: boolean;
  githubRepo?: string;
}

export class SecureBucket extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly oidcRole: iam.Role;

  constructor(scope: Construct, id: string, props: SecureBucketProps) {
    super(scope, id);

    const bucketName = `${props.projectId}-my-bucket`;

    this.bucket = new s3.Bucket(this, 'Bucket', {
      bucketName,
      versioned: props.enableVersioning,
      encryption: props.enableEncryption ? s3.BucketEncryption.KMS_MANAGED : s3.BucketEncryption.UNENCRYPTED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    let oidcProvider;
    if (props.githubRepo) {
      oidcProvider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
        this, 'GithubOIDC', `arn:aws:iam::${cdk.Stack.of(this).account}:oidc-provider/token.actions.githubusercontent.com`
      );
      this.oidcRole = new iam.Role(this, 'GithubActionsRole', {
        assumedBy: new iam.FederatedPrincipal(
          oidcProvider.openIdConnectProviderArn,
          {
            StringLike: {
              'token.actions.githubusercontent.com:sub': `repo:${props.githubRepo}:*`
            }
          },
          'sts:AssumeRoleWithWebIdentity'
        ),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')
        ]
      });
    } else {
      this.oidcRole = new iam.Role(this, 'DummyRole', {
        assumedBy: new iam.AccountRootPrincipal()
      });
    }

    new cdk.CfnOutput(this, 'BucketName', { value: this.bucket.bucketName });
    new cdk.CfnOutput(this, 'OIDCRoleArn', { value: this.oidcRole.roleArn });
  }
}
