# SecureBucket CDK Construct

This project is a coding challenge submission for a **Senior DevOps Engineer** role. It contains a reusable AWS CDK contruct in TypeScript that provisions a secure S3 bucket and Github OIDC role, along with a complete GitHub Actions CI/CD workflow for deployment.

---

## Features

### Part 1: CDK Construct

- Create an **S3 bucket** with:
  - Name prefixed by 'projectId'
  - Optional versioning ('enableVersioning')
  - Optional KMS-managed encryption ('enableEncryption')
- Create an **IAM Role** with Github OIDC trust for secure CI/CD access (optional, based on 'githubRepo' pro)
- Outputs:
  - 'bucketName'
  - 'oidcRoleArn' (if created)

### Part 2: CI/CD with GitHub Actions

- Runs on push to 'main'
- Steps include:
  - Dependency installation
  - Linting
  - Unit Testing with Jest
  - CDK synth
  - Deploy to **dev** using GitHub OIDC
- Optionally supports 'cdk diff', multiple environments, and manual approvals (for bonus points)

---

## Project Structure

coding_challenge_evinova/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── bin/
│   └── app.ts                  # CDK entry point
├── lib/
│   └── secure-bucket.ts        # Reusable CDK construct
├── test/
│   └── secure-bucket.test.ts   # Unit tests
├── cdk.json
├── package.json
└── README.md


