# slack-aws-sns

## Create a slack webhook
Unfortunately this is a ui driven process

1. Go to https://your-company.slack.com/services/new
1. Click 'Incoming WebHooks'
1. Create a new one by selecting a channel and clicking "Add incoming webhook integration"
1. Copy the webhook url for use later

## Create sns topic
```
> aws sns create-topic --name Billing
{
    "TopicArn": "arn:aws:sns:us-east-1:111122223333:Billing"
}
> aws sns subscribe --topic-arn arn:aws:sns:us-east-1:111122223333:Billing --protocol email --notification-endpoint <your-email-address>
```

## Create cloudwatch alarm
```
> aws cloudwatch put-metric-alarm \
	--alarm-name "billing more than $1" \
	--comparison-operator GreaterThanOrEqualToThreshold \
	--evaluation-periods 1 \
	--metric-name EstimatedCharges \
	--namespace AWS/Billing \
	--dimensions Name=Currency,Value=USD" \
	--period 21600 \
	--statistic Maximum \
	--threshold 1 \
	--actions-enabled \
	--alarm-actions arn:aws:sns:us-east-1:111122223333:Billing
```

Concept heavily borrowed from

https://medium.com/cohealo-engineering/how-set-up-a-slack-channel-to-be-an-aws-sns-subscriber-63b4d57ad3ea
