# SecureBucket CDK Challenge

This project is a coding challenge submission for a **Senior DevOps Engineer** role. It contains a reusable AWS CDK construct in TypeScript that provisions a secure Amazon S3 bucket and a GitHub OIDC role, along with a GitHub Actions CI/CD workflow for deployment.

---

## Features

### Part 1: CDK Construct

- Create an **S3 bucket** with:
  - Name prefixed by `projectId`
  - Optional versioning (`enableVersioning`)
  - Optional KMS-managed encryption (`enableEncryption`)
- Create an **IAM Role** with GitHub OIDC trust for secure CI/CD access (optional, based on `githubRepo`)
- Outputs:
  - `bucketName`
  - `oidcRoleArn` (if created)

### Part 2: CI/CD with GitHub Actions

- Runs on push to `main`
- Steps include:
  - Dependency installation
  - Linting
  - Unit testing with Jest
  - CDK synth
  - Deploy to **dev** using GitHub OIDC
- Optionally supports:
  - `cdk diff` to detect unauthorized changes
  - Multiple environments (dev/prod)
  - Manual approvals (future work)

---

## Project Structure

```
coding_challenge_evinova/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── bin/
│   └── app.ts                  # CDK app entry point
├── lib/
│   └── secure-bucket.ts        # Reusable CDK construct
├── test/
│   └── secure-bucket.test.ts   # Unit tests
├── cdk.json
├── package.json
├── README.md
└── DECISIONS.md
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Build the project

```bash
npm run build
```

### 3. Synthesize the CDK app

```bash
npx cdk synth
```

### 4. Deploy to AWS

```bash
npx cdk deploy
```

---

## Testing

Run unit tests with Jest:

```bash
npm test
```

---

## Usage Example

Update `bin/app.ts`:

```ts
new SecureBucket(app, 'DevBucket', {
  projectId: 'dev123',
  enableVersioning: true,
  enableEncryption: true,
  githubRepo: 'myorg/myrepo'
});
```

---

## GitHub Actions CI/CD

Key steps in `.github/workflows/deploy.yml`:

- Checkout code
- Install dependencies
- Lint
- Run unit tests
- Synthesize CDK
- Deploy using GitHub OIDC

---

## Props Interface

```ts
export interface SecureBucketProps {
  projectId: string;
  enableVersioning?: boolean;
  enableEncryption?: boolean;
  githubRepo?: string;
}
```

---

## Design Decisions

See [`DECISIONS.md`](./DECISIONS.md) for full breakdown of implementation rationale and trade-offs.