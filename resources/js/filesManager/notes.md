## Props : 


folder : current folder data
ancenstors : parents for bereadcrumbs
descendants: children of current folder

permissions={
	{
	fileActions: ["Share", "Download", "Move To Trash"], : actions for elements of current folder
	upload: true, : create folder, upload files and folders option
}}
routes={{
	home: "my-drive.index",
	neested: "my-drive.folders.show",
	download: "my-drive.files.download",
	delete: "my-drive.files.delete"
}}

## routes : 
- my-drive: 
	- index
	- folders.show
	- folders.new
	- folders.upload
	- files.upload
	- files.delete
	- files.download
- sharedw-me :
	- index 
	- show
	- download
- sharing: 
	- index
		- new
		- update
		- delete
- trash
	- index
	- view
	- restore
	- delete
- auth ...
- profile ...