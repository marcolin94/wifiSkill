![](https://images-na.ssl-images-amazon.com/images/G/01/kindle/dp/2017/4911315144/LP_AG_HERO_BANNER_1334x389.jpg)


# Color Changer Skill for Echo Buttons

**Important: The Echo Buttons Skill API is in beta and is subject to change at any time without notice. We welcome your feedback.**

This sample skill uses:

* The <a href="https://developer.amazon.com/alexa/console/ask" target="_blank">Alexa Skills Kit developer console</a> to configure the skill and specify the interaction model
* The [node.js](https://nodejs.org/) framework for the skill code
* [AWS Lambda](https://aws.amazon.com/lambda) to host the skill
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb) to save a state table (Optional)
* The [Alexa Skills Kit (ASK) SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) to simplify the skill code
* An animation library to create simple animations such as fade out and breathe, as shown in [Animations](https://developer.amazon.com/docs/echo-button-skills/echo-button-animation-library.html#animations). 


## Table of Contents
* [Preparation](#preparation)
* [Step 1 - Setup Local Development Environment](#step-1-setup-local-development-environment)
* [Step 2 - Upload the Deployment Package to AWS Lambda](#step-2-upload-the-deployment-package-to-aws-lambda)
* [Step 3 - Find the ARN of the Lambda function](#step-3-find-the-arn-of-the-lambda-function)
* [Step 4 - Create the Skill](#step-4-create-the-skill)
* [Step 5 - Create an Interaction Model](#step-5-create-an-interaction-model)
* [Step 6 - Select Gadget Interfaces](#step-6-select-gadget-interfaces)
* [Step 7 - Enter the Endpoint](#step-7-enter-the-endpoint)
* [Step 8 - Enter Publishing Information](#step-8-enter-publishing-information)
* [Step 9 - Enter Privacy and Compliance Information](#step-9-enter-privacy-and-compliance-information)
* [Step 10 - Enable the Skill in the Alexa App](#step-10-enable-the-skill-in-the-alexa-app)
* [Step 11 - Invoke the Skill](#step-11-invoke-the-skill)


## Preparation
Before you create the Color Changer skill, you must take the following steps:

* **Create an Amazon developer account** – If you don't already have an Amazon developer account, go to the [developer portal]("https://developer.amazon.com/alexa/console/ask) and select **Sign In** in the upper right to create a free account.
* **Sign up for AWS** – If you haven't already, sign up for AWS by going to [AWS Free Tier](https://aws.amazon.com/free). For most developers, the [AWS Lambda Free Tier](https://aws.amazon.com/lambda/pricing/) and [Amazon DynamoDB Free Tier](https://aws.amazon.com/dynamodb/pricing/) are sufficient for the function that supports an Alexa skill.
* **Get Echo Buttons** – This skill requires two [Echo Buttons](https://www.amazon.com/Echo-Buttons-Alexa-Gadget-Pack/dp/B072C4KCQH). 
* This skill sample uses **NodeJS v8**. If you do not have NodeJS already installed on your computer, install it now. The simplest way to install NodeJS is to use [nvm](https://nodejs.org/en/download/package-manager/#nvm) a Node Version Manager command line tool, with instructions here: https://nodejs.org/en/download/package-manager/#nvm

## Step 1-Setup Local Development Environment 
In this step, you will get a copy of the sample skill code on your local computer and prepare a deployment package (a zip file that you create out of the Color Changer skill code) to upload to Lambda in the next step.

1. Get a local copy of the Color Changer skill code from [alexa-sample-nodejs-buttons-colorchanger](https://github.com/alexa/skill-sample-nodejs-buttons-colorchanger) GitHub. You may clone the repository locally, or simply download and unzip the sample code from GitHub. 
2. After downloading the code, you will have to run `npm install` in the **skill-sample-nodejs-buttons-colorchanger/lambda/custom** folder to download and install the NodeJS package dependencies that this skill uses such as the [Alexa SDK](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs). NPM will be available on your computer if you have NodeJS installed (see the [Preparation](#preparation) step above).  
3. Zip up all of the files that are in the **skill-sample-nodejs-buttons-colorchanger/lambda/custom** folder. This zip file will be your deployment package. Be sure to only zip the files and folders that are *inside* the **skill-sample-nodejs-buttons-colorchanger/lambda/custom** folder, not the **skill-sample-nodejs-buttons-colorchanger/lambda/custom** folder itself. AWS Lambda must be able to find the **index.js** file at the root of the zip file.

## Step 2-Upload the Deployment Package to AWS Lambda
In this step, you upload the deployment package to AWS Lambda. Later, when you set up the skill in the developer portal, you will specify that this function is the endpoint for the skill.

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/console/home) and navigate to the [AWS Lambda console](https://console.aws.amazon.com/lambda/home), which is located under **Compute** services.
2. Select **Create function**.
3. Make sure that you are on the **Author from scratch** page.
4. For **Name**, enter **ColorChanger**.
5. For **Runtime**, select **Node.js 8.10**.
6. For **Role**, select **Create a custom role**. This will take you to the IAM console.
7. In the IAM console, expand **View Policy Document**.
8. Click **Edit**, click **OK** in the dialog box, and then replace the entire policy with the following JSON (_the dynamodb permissions in the policy below are only needed if you choose to enable session attributes to be stored in DynamoDB, in the skill code (index.js)_):
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:PutLogEvents",
                "logs:CreateLogStream",
                "iam:GetRole",
                "iam:ListRoles",  
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:DeleteItem",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:UpdateItem",
                "dynamodb:CreateTable",                
                "dynamodb:DescribeTable"
            ],
            "Resource": "*"
        }        
      ]
}
```
9. At the bottom right of the page, click the **Allow** button. This will take you back to the Lambda console.
10. Back in the Lambda console, for **Role**, select **Choose an Existing Role**.
11. For **Existing Role**, select the role you just created.
12. In the lower right, click the **Create function** button. The function might take a moment to create.
13. Scroll down a bit. Under the **Function code** section, for **Code entry** type, select **Upload a .ZIP** file. Then click **Upload** and choose the **ColorChanger** zip file that you created in the first step.
14. For **Runtime**, select **Node.js 8.10**.
15. At the top of the page, under the **Designer** section, under **Add triggers**, select **Alexa Skills Kit**. 
16. At the bottom of the page, under **Configure Triggers**, select **Disable** for **Skill ID verification**.
17. At the bottom of the page, click **Add**.
18. At the top of the page, click **Save**. 

## Step 3-Find the ARN of the Lambda function
In this step, you find the Amazon Resource Name (ARN) of the Lambda function that you just created. The ARN serves as the ID of the function. You can find the ARN at the top right of the Color Changer function page in the AWS Lambda console. The ARN will look something like `arn:aws:lambda:us-east-1:012345678910:function:ColorChanger`.

Copy the ARN. Later, when you set up the Color Changer skill in the developer portal, you will provide this ARN as the endpoint for the skill.

## Step 4-Create the Skill 

Next, create the skill in the developer console by using the following steps:

1. Sign in to the <a href="https://developer.amazon.com/alexa/console/ask" target="_blank">Alexa Skills Kit developer console</a>. 
2. Select **Create Skill**.
3. For **Skill Name**, enter **Color Changer**, and then select **Next** in the upper right.
4. For **Choose a model to add to your skill**, select **Custom**, and then select **Create Skill** in the upper right.

***Important: If you get an 'unspecified error' when performing any of the remaining steps, try logging out and then logging back in to the developer console.***

## Step 5-Create an Interaction Model 

Continuing from the previous step, do the following:

1. On the left side, select **Invocation**.
2. For **Skill Invocation Name**, enter `color changer`, and then select **Save Model**.
3. Add built-in intents for "yes" and "no" as follows:
   1. On the left side, select **Intents**.
   2. Select **Add Intent**.
   3. Select **Use an existing intent from Alexa's built-in library**.
   4. In the search box, type `yes`. The search results should come up with `AMAZON.YesIntent`.
   5. Next to `AMAZON.YesIntent`, select **Add Intent**.
   6. Using a similar procedure, add `AMAZON.NoIntent`.
   7. At the top of the page, select **Save Model**.
4. You will now create slots for a custom intent. (You will create the custom intent in the next step.) Think of a slot as a variable that your intents can use. Create slots for colors as follows:
   1. On the left, select **Slot Types**.
   2. Select **Add Slot Type**.
   3. Under **Create custom slot type**, type `COLORS`, and then select **Create custom slot type**. 
   4. Under **Slot Values**, enter `green`, and then, on the right side of the text field, select the **+** sign.
   5. Add **Slot Values** for `red` and `blue` also. Do not save the model yet; it might return an error.
   6. On the left, select **Slot Types**.
   7. At the top of the page, select **Save Model**.
5. Add a custom intent as follows:   
   1. On the left side, select **Intents**.
   2. Select **Add Intent**.
   3. Under **Create custom intent**, enter `colorIntent`, and then select **Create custom intent**.
   4. Scroll down to the **Intent Slots** section of the page.
   5. For **NAME**, enter `color` and then, to the right of the name, select the **+** sign.  
   6. For the slot you just created, select **SLOT TYPE** and then select **COLORS**, which is a slot type that you created in a previous step.   
   7. Scroll up to **Sample Utterances**.
   8. In the **Sample Utterances** field, enter `{` (that is, a left brace), select **color**, and then select the **+** sign.
   9. In the **Sample Utterances** field, enter `I like {`, select **color**, and then select the **+** sign.
   10. In the **Sample Utterances** field, enter `Let's go with {`, select **color**, and then select the **+** sign.
   11. In the **Sample Utterances** field, enter `How about {`, select **color**, and then select the **+** sign.   
   12. On the left side, select **Intents**.   
   13. At the top of the page, select **Save Model**.
   14. Select **Build Model**. The model might take a moment to build.

 **Note** An alternative to manually adding the intents one by one is to use the JSON editor to upload the `en-US.json` model file from the `models` folder directly to the web editor.

## Step 6-Select Gadget Interfaces

Continuing from the previous step, do the following:

1. On the left side, select **Interfaces**.
2. From the interface list, select and toggle both **Gadget Controller** and **Game Engine** on.
3. At the top of the page, select **Save Interfaces**.

## Step 7-Enter the Endpoint

Continuing from the previous step, do the following:

1. On the left side, select **Endpoint**.
2. For **Service Endpoint Type**, select **AWS Lambda ARN**. 
3. In the **Default Region** field, paste the ARN of the Lambda function that you created in an earlier step. Leave the other options at their default values.
4. At the top of the page, select **Save Endpoints**.

## Step 8-Enter Publishing Information

Continuing from the previous step, do the following:

1. At the top of the page, select **Launch**.
2. For **One Sentence Description** and **Detailed Description**, enter `This is a sample skill for Echo Buttons.`
3. For **Example Phrases**, enter `Alexa, open Color Changer`. 
4. For **Echo Button Use**, select **Required**.
5. For **Number of Echo Buttons**, select a **Min** of **2** and a **Max** of **2**.
6. For **Number of Players**, select **1** for both **Min** and **Max**.  
7. Skip the icon part for now.
8. For **Category**, select **Games**.
9. At the bottom of the page, select **Save and continue**.

## Step 9-Enter Privacy and Compliance Information

Continuing from the previous step, do the following:

1. For **Does this skill allow users to make purchases or spend real money?**, select **No**.
2. For **Does this Alexa skill collect users' personal information?**, select **No**.
3. For **Is this skill directed to or does it target children under the age of 13?**, select **No**.
4. For **Does this skill contain advertising?** select **No**.
5. For **Export Compliance**, select the checkbox.
6. For **Testing Instructions**, enter `None`.
7. At the bottom of the page, select **Save and continue**.
8. Again, select **Save and continue**. This will accept the default options on the **Availability** page. 

   You should now be on the **Submission** page, which will tell you that fixes are required (to add icons). You don't need to add icons now because you can test the skill without submitting it for certification.

## Step 10-Enable the Skill in the Alexa App
Your Color Changer skill is in the development state and available for you to test with your Amazon Echo device and your Echo Buttons. First, you must ensure that the skill is enabled in the Alexa app. To check this, do the following:

1. Go to the web version of the Alexa app ([alexa.amazon.com](https://alexa.amazon.com/)) and sign in with your Amazon developer account.
2. Choose **Skills** from the main menu.
3. In the upper right, choose **Your Skills**.
4. Using the search bar, search for the Color Changer skill. 
5. Select the skill. If the skill is already enabled, the button next to the skill name says **DISABLE SKILL**. In that case, you are finished with this step. If the button says **ENABLE**, then select that button.


## Step 11-Invoke the Skill
Pair your Echo Buttons to your Amazon Echo device, and then invoke the skill by saying "***Alexa, open Color Changer***". The skill should run as described in the [skill flow](#skill-flow).

