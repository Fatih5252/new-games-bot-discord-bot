# new-games-bot-discord-bot
This is the new Open source code for the Games Bot.<br>
The `https://github.com/fatih5252/games-bot-discord-bot` one is outdateted because of that, this is the new repository.<br>
[here you can invite the bot](https://discord.com/oauth2/authorize?client_id=1217541066434154627)<br>

# Building<br>
Use the command npm i to install all of the packages (or install them manually).

# THINGS YOU HAVE TO DO<br>
change src/functions/handelCommands.js line 6 Discord client id<br>
change src/commands/other/deleteschema.js line 24 owner/bot developer id's<br>
change src/commands/moderation/blacklist.js line 24 owner bot developer id's<br>
change src/commands/moderation/verify.js line 14 owner/bot developer id's<br>
change src/index.js line 41 Private discord server id<br>
change src/index.js line 88 discord Category id<br>
change src/index.js line 137 Private discord server id<br>
change src/events/bugreport.js line 17 change discord category id<br>
Delete rpc.js<br>
## IF YOU DONT DO THIS, YOUR BOT WILL NOT WORK.<br>
<br>

# helpfull
## How to Get Your MongoDB Atlas Connection URL

To connect to a MongoDB Atlas database, you first need to obtain a special connection string, often called the **connection URL**. This URL contains all the necessary information your application needs to connect to the database, such as the username, password, cluster address, and database name. Let me explain the process of getting this connection string in a clear and complete way.

First, you need to visit the MongoDB Atlas website at [https://cloud.mongodb.com](https://cloud.mongodb.com) and log in with your account. If you don't already have an account, you can create one for free. Once you're logged in, you'll be taken to the Atlas dashboard. If you don’t already have a cluster, which is essentially a MongoDB database hosted in the cloud, you can create one by clicking the **"Build a Cluster"** button. Atlas will ask you to choose a cloud provider (like AWS, Google Cloud, or Azure), a region, and a cluster tier. You can select the free tier (called **M0**), which is perfect for testing or learning. Once you make your selections, the cluster will take a few minutes to be set up.

After your cluster is ready, the next step is to set up database access. You need to create a **database user** with a username and password. This can be done by going to the **“Database Access”** section in the left-hand menu. There, you click on **“Add New Database User”** and choose a username and password. These credentials will later be used in the connection string. You can also assign access levels, such as read and write access to any database.

Then, you need to allow your device to access the database. MongoDB Atlas restricts access to trusted IP addresses for security. Go to the **“Network Access”** section and click on **“Add IP Address.”** If you're just testing, you can allow access from anywhere by entering `0.0.0.0/0`, although this is not recommended for production environments.

Once you have a user and network access set up, go back to your cluster and click the **“Connect”** button. Atlas will ask how you want to connect; choose **“Connect your application.”** Then, select your driver (for example, Node.js) and version. After that, Atlas will show you a pre-generated connection string. It will look something like this: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority` 
You must replace the placeholders with your own information. For example, if your username is `admin`, your password is `MyPassword123`, and your database name is `myapp`, then the final connection string would look like: `mongodb+srv://admin:MyPassword123@cluster0.mongodb.net/myapp?retryWrites=true&w=majority` 
It is important to note that if your password includes special characters (like `@`, `/`, or `:`), you will need to **URL-encode** them. For instance, the `@` symbol becomes `%40`.

Now that you have your connection URL, you can use it in your application. In many cases, especially in web development, developers use this string with a MongoDB library like **Mongoose** (in Node.js). You can also store this URL in an environment variable to keep your credentials safe and your code clean.

In summary, getting the MongoDB Atlas connection URL involves creating a cluster, setting up a user and IP access, and copying a customized connection string. This string is then used by your application to communicate securely with your MongoDB database hosted in the cloud.

## DISCORD

To get a Discord bot token, you need to go through a few steps on the Discord Developer Portal. This token is a secret string that identifies and authorizes your bot to interact with the Discord API. You cannot use Discord's features as a bot without it, and it's important to keep it private to prevent others from controlling your bot.

First, you need to visit the Discord Developer Portal at [https://discord.com/developers/applications](https://discord.com/developers/applications). You will need to log in with your Discord account if you haven’t already. Once you're on the portal, click the **“New Application”** button to start creating your bot. A dialog box will appear asking for a name—this can be anything, such as "MyBot" or "GoodBot." Once you've chosen a name and confirmed, the application will be created and you’ll be redirected to its settings page.

On the settings page, you'll see various sections in the left-hand sidebar. To create a bot account within this application, click on the **"Bot"** tab. Then, click the **"Add Bot"** button, and confirm when prompted. At this point, Discord will generate a bot user for your application. You can optionally set a username and profile picture for your bot.

Now that your bot is created, you can retrieve its token. Still on the **“Bot”** tab, you will see a section labeled **“Token.”** Click the **“Reset Token”** or **“Reveal Token”** button (depending on whether one has been generated before), and then copy the token. This token is a long string of letters and numbers—essentially, it's like a password for your bot. Be very careful with it.

## AGAIN IF YOU DONT DO THIS BOTH STEPS THEN NOTHING WILL WORK

Bye bye👋
