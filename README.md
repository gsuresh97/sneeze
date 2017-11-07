## Needed Resources
 * Django
 * Django Rest Framework
 * MongoDB
 * pymongo

## MongoDB Schema
```
db: db
	collection: _____
		[{
			loc: [long, lat],
			file_id: "id",
			user: "user_name",
			time: time

		}]
```

		The MongoDB database for this is stored at ./db. This folder is not included in the git because it takes too much space. To start the database, execute mongod --dbpath <PATH_TO_SNEEZE_PROJECT>/db

## Server Functionality

Sneeze Endpoint:
* Receives latlong, file identifier, username
* Assigns time received and stores in db
Image/Text Upload Endpoint:
* Fields
	- format (image/text)
	- binary of image/text
* Store image/text binary in local folder
	- filename is id
	- id is sequential and prefixed with 'txt_' or 'img_' so we can later determine how to display
* Returns identifier to listening client if successful, error otherwise
Metadata Endpoint:
* Receive a request with file_id
* Return list of latlongs, usernames (maybe?), times

## Mobile Functionality

UI Requirements:
* Create Meme
	- Upload Image using native prompt or Text Entry
	- Hit "Sneeze" to send data to server
* Receive Meme
	- Send native notification to device upon receipt
	- In app, display image/text from "sneezed image"
	- Sneeze, ignore, view map (maybe arrow, X, globe?)
	- View map will show local map with connected points indicating spread (auto zoom to total coverage area)

Communication with Server:
* We need location, image/text, and username to be sent to server
* Location
	- To get the location in React Native, use getCurrentPosition() in Geolocation API. This returns a Position object which has a Coordinates member. Use this in your API calls.
		- https://facebook.github.io/react-native/docs/geolocation.html
	- https://developer.mozilla.org/en-US/docs/Web/API/Coordinates
* Image
	- Resize images to max 800x600 for optimal performance
		- https://github.com/bamlab/react-native-image-resizer
	- Send compressed image binary to server's upload endpoint
		- Listen for response, attain ID or error if receive error/timeout
	- Send request to meme sneeze endpoint with latlong, id, username
* Text
	- Send text binary to server's upload endpoint
		- Listen for response, attain ID or error if receive error/timeout
	- Send request to meme sneeze endpoint with latlong, id, username
* Receiving a meme
	- Receive binary file, its format, and its id
	- If user hits sneeze, send latlong, file id, username to sneeze endpoint
	- If user hits ignore or does nothing, do nothing
	- If user hits map, hit metadata endpoint with id and parse/display received list of points
		- https://github.com/airbnb/react-native-maps
