# Project Description
  ## Problem Statement : 
    Only 3.7% of the Indian population invests in the stock market right now. 
    The possible reasons for this might be
    1. Not enough money to invest/ not enough money to hold for a long time
    2. Not enough knowledge to invest
    3. Not enough time to invest.
    4. The money invested in the stock market can’t be used for buying good and services or to carry out any form of transaction by the user.

  ## The Solution
  Z coins tries to solve all the above mentioned problems. Instead of putting your money in the bank, if you put them in the Z coins app/website, you can expect returns on the money you have invested without having to worry about what shares to invest in or about the amount of money required to invest in the first place. 
  
  The money pooled up through this platform will be invested in the stock market using Algorithmic Trading and the returns will be shared proportionally. 
  
  Although each customer might maintain less cash in their wallet, with a considerable number of people using the product, we can expect good results. We will invest in a wide basket of stocks which makes the product less susceptible to losses. Even if one company’s shares fall down or don’t act the way we expect, there wouldn’t be much loss due to the diversity of the portfolio. 
  
  The money in the wallet is used to buy Z-coins. Z-coin's value would be determined by the market conditions but the price will be a small amount like ₹100. 
  
  ### Target Audience
  This would be a good way to start investing for someone who is risk averse. If the user believes that the stock market can be a place where he can earn a decent income, that would motivate him to dig deep into it. 
  
  For users who don’t know how to analyze the stock market, we would be investing on their behalf. They can invest in the market without knowing the technical details. 
  
  The users would not be knowing which stocks we are investing in. So they won’t keep checking the statistics. People who don’t have time to monitor their investments can use this product to save time and invest at the same time. 
  
  People who don’t think they have enough money to invest in the stock market can start investing in small amounts using this app. Due to pooling of money, we don’t need a single person to buy a complete stock. 
  
  Finally, instead of keeping a small amount of money in the bank for meager interest, they can put their money in Z coins and hope for better results.  
   
  For example: a person has 1000 rs and wants to invest it in the stock market but the value of stock itself is 3000rs, he might be able to do it. Since this product works on money pooled from a lot of people, we can invest on their behalf and distribute the profits.  

  <b>Withdrawal:</b> Procedure for withdrawal depends on the time the user requests for a withdrawal. 5:30 PM - 9:00 AM : The person has to wait till 9:00 AM to withdraw his money. 9:00 AM- 5:30 PM : The person has to wait till 5:30 PM to withdraw his money. Although this seems restrictive, it is far more convenient than Fixed deposits and mutual funds where you can not withdraw your investment incase of emergency without penalty.  

  <b>Transactions:</b> The user need not withdraw cash inorder to buy something. The user can buy goods and services using Z-coins, provided the service provider also has a Z-coin wallet. Here it has to be noted that the profit/loss will also be given to the receiver of the coin. So in short, the Z-coin is being transferred from one person to another instead of money.
<br/>
## Request/Accept Coins: 
The person can request & accept Z-coins from any other Z-coin user using the other person’s mobile number.
<br/>
## Technologies Used
Reactjs, CSS, NodeJs, ExpressJs, Passport, MongoDb, Axios
<br/>
## Video 
https://youtu.be/L6ks6jjAMvY
<br/>
## Presentation 
https://he-s3.s3.ap-southeast-1.amazonaws.com/media/sprint/zeta-hacks/team/1144024/ee5b1cfz_coins.pptx
<br/>
## Demo 
https://z-coins.herokuapp.com
<br/>
## Instructions: 
1.)0000000001 is a phone number that is there in the database. So any testing can be done on that. 
<br/>
## Instructions to run the website locally
1.) Run <b>"npm i"</b> in the root directory <br/>
2.) Run <b>"npm i"</b> in the root/client directory  <br/>
3.) Run <b>"npm run dev"</b> in root directory. <br/>

# Algorithmic Trading

pyAlgotrade.py implements an algorithm which takes in a CSV file (AAPL.csv) containing the details of stock market prices and predicts if we should by the stock or sell it if we have it. The program is inspired from the [pyAlgoTrade librarie's demo](http://gbeced.github.io/pyalgotrade/docs/v0.20/html/tutorial.html). 

Currently, the program is very simple but the final plan is to implement an algorithm capable of predicting stock market prices accurately using Deep learning. It would do the trading autonomously once it's accuracy is proven. 

# Use of Fusion APIs in the project

## Account Holder creation
We  used the Account Holder creation API during the singup process when the user first enters the website. It creates a unique identification ID for the user. 

## Account Creation
Once the Account Holder is created during the signup, his account will be created using the account creation API. 

## Payments API

### Fund Transfers API
We use the funds API to add/withdraw money from a user. Zeta has provided us with the details of an account with some balance in it. 
Whenever a user tries to add money into his wallet, money from this account will be transfered into the user account. And when he tries to withdraw the money from his wallet, they will be added back to the same account that Zeta has provided us. Right now it uses a single account that Zeta has provided, but it can be extended to connect directly to the user's personal bank account in real-world applicaion. 
