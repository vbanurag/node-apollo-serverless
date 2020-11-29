rm -rf .deploy
mkdir .deploy
touch .deploy/serverless-output.yaml

# package
aws cloudformation package \
  --template-file template.yaml \
  --output-template-file .deploy/serverless-output.yaml \
  --s3-bucket get-metadata-dev


# deploy
aws cloudformation deploy \
  --template-file .deploy/serverless-output.yaml \
  --stack-name dev \
  --capabilities CAPABILITY_IAM