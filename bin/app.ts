import * as cdk from 'aws-cdk-lib';
import { SecureBucket } from '../lib/secure-bucket';

const app = new cdk.App();

new SecureBucket(app, 'DevBucket', {
  projectId: 'dev123',
  enableVersioning: true,
  enableEncryption: true,
  githubRepo: 'myorg/myrepo'
});
