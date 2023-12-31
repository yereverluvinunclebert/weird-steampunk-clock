


//======================================================================================
// Function to move the mainWindow onto the main screen
//======================================================================================
function mainScreen() {
    // if the widget is off screen then move into the viewable window
    if (mainWindow.hOffset < 0) {
        mainWindow.hOffset = 10;
    }
    if (mainWindow.vOffset < 32) {
        mainWindow.vOffset = 32; // avoid Mac toolbar
    }

    //log("%MOON-I-MAINSCREEN, mainWindow.vOffset " + mainWindow.vOffset);
    //log("%MOON-I-MAINSCREEN, screen.height " + screen.height);

    if (mainWindow.hOffset + 120 > screen.width ) {
        mainWindow.hOffset = (screen.width - mainWindow.width) + 100;
    }
    if (mainWindow.vOffset + 120 > screen.height ) {
        mainWindow.vOffset = (screen.height - mainWindow.height) + 150; // avoid Mac toolbar
    }

    // calculate the current hlocation in % of the screen
    //store the current hlocation in % of the screen
    if ( preferences.hLocationPercPref.value != 0) {
      preferences.hLocationPercPref.value = (mainWindow.hoffset / screen.width)* 100;
    }
    if ( preferences.vLocationPercPref.value != 0) {
      preferences.vLocationPercPref.value = (mainWindow.voffset / screen.height)* 100;
    }
    // now move the widget to a preferred location if one has been set
    if (preferences.hoffsetpref.value > 0) {
        mainWindow.hOffset = parseInt(preferences.hoffsetpref.value, 10);
    }
    if (preferences.voffsetpref.value > 0) {
        mainWindow.vOffset = parseInt(preferences.voffsetpref.value, 10);
    }

}
//=====================
//End function
//=====================



//===============================
// function to resize all layers
//===============================
function resize() {
    var scale = Number(preferences.scalePref.value) / 100;

    main_frame.hoffset = 32 * scale;
    main_frame.voffset = 32 * scale;
    theClock.reScale(scale);
    log("Resizing: preferences.scalePref.value: " + preferences.scalePref.value);
    log("scale: " + scale);
    mainWindow.height = mainWindowheightDefault * scale;
    mainWindow.width  = mainWindowwidthDefault * scale;

    scaleImage(BottomHelp, 0, 0, 231, 328);
    scaleImage(backplate, 14, 41, 207, 212);
    scaleImage(wheel,30, 133, 81, 80,41,41);
    scaleImage(smallCog, 145, 94, 68, 68, 34, 34);
    scaleImage(cog, 99, 147, 98, 99, 50, 50);
    scaleImage(cogShadow, 100, 148, 108, 108, 54, 54);
    scaleImage(monthCog, 20, 40, 98, 99, 50, 50);
    scaleImage(bodyAndPipes, 65, 6, 104, 296);
    scaleImage(valve, 65, 185, 33, 33);
    scaleImage(valve2, 140, 185, 33, 33);
    scaleImage(steam, 5, 195, 75, 75);
    scaleImage(memoryGauge, 127, 41, 94, 103);
    scaleImage(chain, 7, 73, 23, 173);
    scaleImage(crane, 4, 53, 90, 54);
    scaleImage(handles, 33, 88, 173, 78);
    scaleImage(plate, 63, 88, 111, 111);
    scaleImage(TopHelp, 0, 0, 231, 328);

}
//=====================
//End function
//=====================

//=========================================================================
// this function assigns translations to preference descriptions and titles
//=========================================================================
function setmenu() {
    mainWindow.onContextMenu = function() {
 	var items = [], mItem;

        mItem = new MenuItem();
        mItem.title = "Online Help";
        mItem.onSelect = function () {
            widgethelp();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Donate a Coffee with Ko-Fi";
        mItem.onSelect = function () {
            donate();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function () {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "See More Steampunk Widgets";
        mItem.onSelect = function () {
            otherwidgets();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Download Latest Version";
        mItem.onSelect = function () {
            update();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Display Licence Agreement...";
        mItem.onSelect = function () {
            displayLicence();   
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Contact Support";
        mItem.onSelect = function () {
            contact();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Chat about Steampunk Widgets on Facebook";
        mItem.onSelect = function() {
            facebookChat();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Reveal Widget in Windows Explorer";
        mItem.onSelect = function() {
            findWidget();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Reload Widget (F5)";
        mItem.onSelect = function () {
            reloadWidget();
        };
	items.push(mItem);

    if (preferences.imageEditPref.value != "" && debugFlg === "1") {
            mItem = new MenuItem();
            mItem.title = "Edit Widget using " + preferences.imageEditPref.value ;
            mItem.onSelect = function () {
                editWidget();
            };
            items.push(mItem);
    }
    mainWindow.contextMenuItems = items;

    };
}
//=====================
//End function
//=====================
//===========================================
// this function opens the online help file
//===========================================
function widgethelp() {
    var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("https://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens other widgets URL
//===========================================
function otherwidgets() {
    var answer = alert("This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("https://www.deviantart.com/yereverluvinuncleber/gallery/59981269/yahoo-widgets");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens the URL for paypal
//===========================================
function donate() {
    var answer = alert("Help support the creation of more widgets like this, send us a coffee! This button opens a browser window and connects to the Kofi donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
                openURL("https://www.ko-fi.com/yereverluvinunclebert");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the download URL
//===========================================
function update() {
    var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("https://github.com/yereverluvinunclebert/weird-steampunk-clock");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens the browser at the contact URL
//===========================================
function contact() {
    var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================


//===========================================
// this function opens the browser at the contact URL
//===========================================
function facebookChat() {
    var answer = alert("Visiting the Facebook chat page - this button opens a browser window and connects to our Facebook chat page.). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function allows a spacer in the menu
//===========================================
function nullfunction() {}
//=====================
//End function
//=====================

//==============================================================
// this function reloads the widget when preferences are changed
//==============================================================
function changePrefs() {
    log("preferences Changed");
    savePreferences();				/// <<<<<<<<<<<<<
    sleep(1000);
    reloadWidget();
}
//=====================
//End function
//=====================
//==============================================================
// this function reloads the widget when preferences are changed
//==============================================================
function settooltip() {
    if ( preferences.imageCmdPref.value == "" ) {
       theClock.clock.tooltip = "Double click on me to assign a double-click function to this widget";
    } else {
       theClock.clock.tooltip = "Current command is - " + preferences.imageCmdPref.value;
    }
}
//=====================
//End function
//=====================


//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
        //uses the contents of imageEditPref to initiate your default editor
        performCommand("menu");
    //}

}
//=====================
//End function
//=====================


//=====================
// function to carry out a command
//=====================
function performCommand(method) {
    var answer;
    
    if (method === "menu") {
        runCommandInBg(preferences.imageEditPref.value, "runningTask");
    } else {
        print("method "+method);
        if (system.event.altKey) { // filesystem.open() call
            if (preferences.openFilePref.value === "") {
                answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
            filesystem.open(preferences.openFilePref.value);
        } else { 
            if (preferences.imageCmdPref.value === "") {
                answer = alert("This widget has not been assigned a double-click function. You need to open the preferences and enter a run command for this widget. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
                runCommandInBg(preferences.imageCmdPref.value, "runningTask");
        }
    }
}
//=====================
//End function
//=====================


//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 // temporary development version of the widget
    var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
    var alertString = "The widget folder is: \n";
    if (filesystem.itemExists(widgetFullPath)) {
        alertString += system.userWidgetsFolder + " \n\n";
        alertString += "The widget name is: \n";
        alertString += widgetName + ".\n ";

        alert(alertString, "Open the widget's folder?", "No Thanks");

        filesystem.reveal(widgetFullPath);
    } else {
        widgetFullPath = resolvePath(".");   
        filesystem.reveal(widgetFullPath);
        print("widgetFullPath " + widgetFullPath);
    }
}
//=====================
//End function
//=====================


//======================================================================================
// Function to scale the image
//======================================================================================
function scaleImage(o, hOffset, vOffset, width, height, hRegP, vRegP) {
    	 var scale = Number(preferences.scalePref.value) / 100;
        o.width  = Math.round(scale * width);
    	o.height = Math.round(scale * height);
	//print("**SCALE**" + scale);
    	hRegP = hRegP || 0;                     // hRegP and vRegP are optional parameters
    	vRegP = vRegP || 0;

    	hOffset += hRegP;
    	vOffset += vRegP;

    	o.hOffset = Math.round(scale * hOffset);
    	o.vOffset = Math.round(scale * vOffset);

    	o.hRegistrationPoint =  Math.round(scale * hRegP);
    	o.vRegistrationPoint =  Math.round(scale * vRegP);
	};

//======================================================================================
// Function to scale the image by mousewheel
//======================================================================================
backplate.onMouseWheel = function (event) {
   var size = Number(preferences.scalePref.value),
        maxLength = Number(preferences.scalePref.maxLength),
        minLength = Number(preferences.scalePref.minLength),
        step = 10;

    if (event.ctrlKey) {
	    if (event.scrollDelta > 0) {
	        size += step;
	        if (size > maxLength) {
	            size = maxLength;
	        }
	    } else if (event.scrollDelta < 0) {
	        size -= step;
	        if (size < minLength) {
	            size = minLength;
	        }
	    }
	    preferences.scalePref.value = String(size);
	    resize();
	}
};