# verifi
An open-source express API for verifying Roblox users on discord, developed as a part-time project.

## Prerequisites
[Node 11.0 or higher with additional tools](https://nodejs.org/)
<br>
Know the basics of **Express** and **JS**

## Installation
[Download verifi](https://github.com/ATPStorages/verifi/archive/master.zip), and unzip it to a directory. (ex. /Desktop/verifi)

### Windows
Since verifi uses [enmap](https://enmap.evie.dev/)/[better-sqlite3](https://www.npmjs.com/package/better-sqlite3) which is a library *built on the system*, you need to install more than just node. Open an administrative powershell and run the following:
<br>
`npm i -g --add-python-to-path --vs2015 --production windows-build-tools`

When windows-build-tools has been successfully installed, **close all command lines running on the system**. Open a new terminal at verifi's unzipped directory and run `npm install`. 
<br>

### MacOS
Install [XCode](https://developer.apple.com/xcode/download/).
<br>
Once XCode is done installing, go to **Preferences > Downloads** and install "Command Line Tools."

### Linux

Since most distros automatically come with Python 2.7, the installation process is much easier. However, if your distro doesn't, try looking up how to.
<br>
To install the C++ build tools, run `sudo apt-get install build-essential`.

---
Once you have installed build tools for your system, navigate to verifi's directory with `cd`, and then run `npm install`.


If you had a better-sqlite3 installation issue, check their [troubleshooting guide](https://github.com/JoshuaWise/better-sqlite3/blob/HEAD/docs/troubleshooting.md).
<br>
If you had a different installation problem, submit an [issue](https://github.com/ATPStorages/verifi/issues).

---
## Starting verifi

To start verifi, run `node .` or `node index.js` in it's directory. A message should appear saying: `Started verifi at port <port>.`

Open your browser or use a client like [Insomnia](https://insomnia.rest/) and go to `localhost:<port>`. You should see `verifi active @ localhost:<port>`.

## Using verifi
If you don't have a domain to run verifi on, you can temporarily use [ngrok](https://ngrok.com/), which allows you to make a port on localhost publically available on the internet.

verifi API:

### GET /verify/tokens/:rblxid

Returns object set by POST /verify/tokens.

### POST /verify/tokens
<table>
    <tr>
        <th>Query Value</th>
        <th>Optional</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>rblxid</td>
        <td>❌</td>
        <td>Roblox ID of the user. Serves as a database key.</td>
    </tr>
    <tr>
        <td>discid</td>
        <td>❌</td>
        <td>Discord ID of the user. Property of an object in the database.</td>
    </tr>
    <tr>
        <td>tag</td>
        <td>❌</td>
        <td>Username and discriminator of the user. (example#0000)</td>
    </tr>
</table>
Creates object:
<table>
    <tr>
        <th>Key</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>id</td>
        <td>000000000000000000</td>
    </tr>
    <tr>
        <td>tag</td>
        <td>example#0000</td>
    </tr>
</table>

### DELETE /verify/tokens/:rblxid
Removes object set by POST /verify/token (unlink verified account)
