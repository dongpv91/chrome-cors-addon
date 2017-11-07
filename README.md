chrome-cors
=============

The Cross-Origin Resource Sharing standard works by adding new HTTP headers that allow servers to describe the set of origins that are permitted to read that information using a web browser.  Additionally, for HTTP request methods that can cause side-effects on user data (in particular, for HTTP methods other than GET, or for POST usage with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with an HTTP OPTIONS request method, and then, upon "approval" from the server, sending the actual request with the actual HTTP request method. Servers can also notify clients whether "credentials" (including Cookies and HTTP Authentication data) should be sent with requests.

![alt cors](https://mdn.mozillademos.org/files/14295/CORS_principle.png)

chrome-cors is a Google Chrome extension which allows you to selectively apply CORS Headers to any web server responses
you choose. This is extremely helpful when developing a web application that makes Ajax/XHR requests.

The extension requires you to specify the domains that you wish to monitor and allows you to explicitly define the
headers to be added.  This is preferable to completely disabling XHR security in your browser, which is a big security
hole.



Installation
------------

To install the extension into Chrome (tested on version 20)

* Download the source, or checkout via git

        git clone https://github.com/dongpv-vn/chrome-cors.git
* Open Chrome, hit the Settings Icon > Tools > Extensions
* Enable "Developer Mode" via the checkbox at the top
* Click the "Load unpacked extension" button and select the folder where you downloaded the code

References
----------
https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS

https://developer.chrome.com/extensions
