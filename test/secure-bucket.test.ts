import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SecureBucket } from '../lib/secure-bucket';

test('S3 bucket and OIDC role are created', () => {
  const app = new App();
  const stack = new SecureBucket(app, 'TestBucket', {
    projectId: 'test123',
    enableVersioning: true,
    enableEncryption: true,
    githubRepo: 'myorg/myrepo'
  });
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::S3::Bucket', 1);
  template.resourceCountIs('AWS::IAM::Role', 1);
});
