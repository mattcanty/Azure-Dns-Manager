# Azure DNS Manager
_Please note this project is still in its very early stages. Eager to collaborate!_

## Get started straight away
https://azuredns.firebaseapp.com

Or if you don't trust me, host the files on your own machine. It's just static files.

## Setting up Active Directory

I fully intend to script this!

### Prerequisities

1. Your *tenant* which can be found in the address bar when logged into Azure Portal. You want the bit between the @ and the # - https://manage.windowsazure.com/@YOURDOMAIN.onmicrosoft.com#.
2. A little patience.

### Steps

1. Navigate to the Active Directory area on your Azure portal - the old portal...
2. Select the directory you wish to add the application.
3. Click _Applications_ and then _Add_ at the bottom.
4. Select _Add an application my organization is developing_.
5. Give it a name and check _ WEB APPLICATION AND/OR WEB API_.
6. In _APP ID URI_ enter https://azuredns.firebaseapp.com.
7. In _SIGN-ON URL_ enter your *tenant* followed by the application name from the previous step.
8. After submitting the form click _Configure_ then _Manage Manifest_ at the bottom and download.
9. In the downloaded file set `"oauth2AllowImplicitFlow": true,`.
10. Re-upload the file using the _Manage Manifest_ button.
11. Click _Add Application_.
12. Click the plus next to _Windows Azure Service Management API_. Then click the tick.
13. In the added permission click the _Delegated Permissions_ dropdown and select _Access Azure Service Management (Preview)_
14. Press _Save_ at the bottom.
15. Head over to https://azuredns.firebaseapp.com/settings.html, fill in _tenant_ and _client ID_, hit _save_ then _Login_
