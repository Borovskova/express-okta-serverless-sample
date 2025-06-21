# Secure Express.js API on AWS Lambda with Okta

A production-ready serverless API boilerplate demonstrating JWT-based authentication with Okta, built on Express.js and deployed to AWS Lambda. This project showcases modern security practices, infrastructure as code, and automated CI/CD in a serverless architecture.

## 🏗️ Architecture
Client → API Gateway → AWS Lambda → Okta (JWT Validation)
(Express.js)
↓
DynamoDB

## ✨ Features

- **🔐 Security First**: JWT-based authentication via Okta with granular IAM permissions
- **⚡ Serverless**: Express.js running on AWS Lambda with API Gateway
- **🏗️ Infrastructure as Code**: Complete AWS SAM deployment configuration
- **🚀 CI/CD Ready**: Automated GitHub Actions pipeline with OIDC authentication
- **🎯 Multi-Environment**: Separate test and production configurations
- **📊 Database**: DynamoDB integration with basic CRUD operations
- **📝 TypeScript**: Full TypeScript support for type safety

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Authentication**: Okta (JWT)
- **Database**: AWS DynamoDB
- **Infrastructure**: AWS Lambda, API Gateway, SAM
- **CI/CD**: GitHub Actions with OIDC

## 📋 Prerequisites

Before getting started, ensure you have:

1. **AWS CLI** - [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. **AWS SAM CLI** - [Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
3. **Node.js** (v18 or later)
4. **Okta Developer Account** - [Sign up for free](https://developer.okta.com/signup/)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/Borovskova/okta-express-serverless-sample.git
npm ci
npm start
