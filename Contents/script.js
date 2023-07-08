//===========================================================================
// Steampunk Weathered clock widget
// Originally written and Steampunked by: Harry Whitfield & Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================
/*global mainWindow, SPclock */
                                                                       
/*properties
    displayTime, height, interval, onPreferencesChanged, onTimerFired, reScale,
    scalePref, ticking, value, width
*/
// Added preference to stop cogs turning every second
// Added ability to stop cogs turning every second by a simple click on any cog
//


//resizing variables
 var mainWindowheightDefault = 328;
 var mainWindowwidthDefault  = 231;

 var scale = Number(preferences.scalePref.value) / 100;
 //var scale = 1;	// Number(preferences.scalePref.value) / 100;
 var theClock = new SPclock(main_frame, 0, 0, 1, scale);
 var theClockTimer = new Timer();
 var crainTimer = new Timer();

 var time = new Date();
 var hr = time.getHours(),
    mn = time.getMinutes(),
    se = time.getSeconds();
 var vitalitycnt = 0;
 var cogrotation = 5;

 var tingingSound = "Resources/ting.mp3";
 var creturn = "Resources/creturn.mp3";
 var steamSound = "Resources/steamsound.mp3";
 var pageFumble = "Resources/page-Fumble.mp3";
 var lock = "Resources/lock.mp3";
 var winding = "Resources/winding.mp3";
 
 var widgetName = "weird steampunk clock.widget";
 var debugFlg = ""; 

 widget.onPreferencesChanged = function () {
  resize();
 };

 theClock.clock.onMultiClick = function () {
        log("performCommand: " + preferences.imageCmdPref.value);
        taskcommand = preferences.imageCmdPref.value;
        performCommand("click");
 };

 //=================================
// timer to automate the movement of the cogs on startup - in & out
//=================================
 theClockTimer.onTimerFired = function () {
	updateTime();
 };
 
  //=================================
// timer to automate the movement of the cogs on startup - in & out
//=================================
crainTimer.onTimerFired = function () {
	craneUp();
 };



//===========================================
// this function runs on startup
//===========================================
function startup() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
        preferences.imageEditPref.hidden=false;
        preferences.imageCmdPref.hidden=false;
    } else {
        preferences.imageEditPref.hidden=true;		
        preferences.imageCmdPref.hidden=true;
    }		

    mainScreen();
    resize();

    // create the licence window
    createLicence(mainWindow);

    setmenu();
    settooltip();
    theClock.displayTime(new Date());
    theClockTimer.ticking = false;
    theClockTimer.interval = 1;    
    crainTimer.ticking = false;
    crainTimer.interval = .8;

    // set the widget lock status if pinned

    if (preferences.widgetLockPref.value === "1") {
                log ( "Setting the locking pin ",theClock.pin.hOffset);
                mainWindow.locked = true;
		theClock.pin.opacity = 255;
		theClock.pin.hoffset = preferences.pinhOffsetPref.value * scale;
		theClock.pin.voffset = preferences.pinvOffsetPref.value * scale;
    }

    buildVitality("Resources/dock.png",theClock.dayOfWeek.src,hr,mn);
    animateTheClock();
}
//=====================
//End function
//=====================




//===========================================
// this is the main function that really does all the work
//===========================================
function updateTime() {

    //initialise the time function
    theClock.displayTime(new Date());
    var time = new Date();

    if (preferences.cogAnimationPref.value == "1" ) {
        cog.rotation =
    	cogShadow.rotation =
    	monthCog.rotation =
    	smallCog.rotation  = (cog.rotation + 4) % 360;
    }

    vitalitycnt = vitalitycnt + 1 ; // update the dock vitality once a minute.
    if (vitalitycnt !== 60) {
        return;
    }
        //returns the date/time in a string format
    hr = time.getHours();
    mn = time.getMinutes();
    if (hr <10) {hr="0" +hr;}
    if (mn <10) {mn="0" +mn;}
    log("building Vitality");
    buildVitality("Resources/dock.png",theClock.dayOfWeek.src,hr,mn);
    vitalitycnt = 0 ; // update the drives once a minute.

}
//=====================
//End function
//=====================


//==============================
//  When the widget prefs change
//==============================
widget.onPreferencesChanged = function () {
	reloadWidget();
};

//==============================
// Update the Dock vitality
//==============================
widget.onDockOpened = function () {
	updateVitality();
};

//==============================
// reload after sleep
//==============================
widget.onWakeFromSleep = function () {
	lprint("onWakeFromSleep");
	reloadWidget();
};

//==============================
// pins the widget in place
//==============================
valve.onMouseDown = function () {
   puff(5,195)
   if (valve.src == "Resources/valve.png")
   {
      valve.src="Resources/valve-rotated.png";

   }
   else
   {
      valve.src="Resources/valve.png";
   }
   if (preferences.soundpref.value === "enable") {
        play(winding, true);
   }
   showWidgetPreferences();
};


//==============================
// pins the widget in place
//==============================
valve2.onMouseDown = function () {
   puff(65,195)

   if (valve2.src == "Resources/valve.png")
   {
       valve2.src="Resources/valve-rotated.png";
   }
   else
   {
       valve2.src="Resources/valve.png";
   }
   if (preferences.soundpref.value === "enable") {
        play(pageFumble, false);
   }
   TopHelp.opacity = 255;
   BottomHelp.opacity = 255;
};

//==============================
// pins the widget in place
//==============================
BottomHelp.onMouseDown = function () {
   if (preferences.soundpref.value === "enable") {
        play(pageFumble, false);
   }
       TopHelp.opacity = 0;
       BottomHelp.opacity = 0;
};


//===========================================
// function to emit a puff
//===========================================
function puff(hoffset,voffset)
{
    if (preferences.soundpref.value === "enable") {play(steamSound,false);};
      steam.hoffset= hoffset * scale;
      steam.voffset= voffset * scale;
      for (var a =50;a<=255;a++)
      {
              steam.opacity = a;
              sleep (1);
              a=a+2;
      }
      for (a =50;a<=255;a++)
      {
              steam.opacity = 255-a;
              sleep (1);
              a=a+2;
      }
}
//=====================
//End function
//=====================




//==============================
//
//==============================
wheel.onMouseDown = function () {
        var a;
	cogrotation = cogrotation + 32;
	a = new RotateAnimation(wheel, cogrotation, 990, animator.kEaseOut);
	animator.start(a);
};

//==============================
//
//==============================
monthCog.onMouseDown = function () {
        var a;
	cogrotation = cogrotation + 32;
	a = new RotateAnimation(monthCog, cogrotation, 990, animator.kEaseOut);
	animator.start(a);
        if (preferences.cogAnimationPref.value == "1" ) {
           preferences.cogAnimationPref.value = "0"
        } else {
           preferences.cogAnimationPref.value = "1"
        }
};

//==============================
//
//==============================
smallCog.onMouseDown = function () {
        var a;
	cogrotation = cogrotation + 32;
	a = new RotateAnimation(smallCog, cogrotation, 990, animator.kEaseOut);
	animator.start(a);
        if (preferences.cogAnimationPref.value == "1" ) {
           preferences.cogAnimationPref.value = "0"
        } else {
           preferences.cogAnimationPref.value = "1"
        }
};

//==============================
//
//==============================
cog.onMouseDown = function () {
        var a,b;
	cogrotation = cogrotation + 32;
	a = new RotateAnimation(cog, cogrotation, 990, animator.kEaseOut);
	b = new RotateAnimation(cogShadow, cogrotation, 990, animator.kEaseOut);
	animator.start([
		a, b
	]);
        if (preferences.cogAnimationPref.value == "1" ) {
           preferences.cogAnimationPref.value = "0"
        } else {
           preferences.cogAnimationPref.value = "1"
        }
};

//==============================
//
//==============================
crane.onMouseDown = function () {
  craneDown();
};

//==============================
//
//==============================
crane.onMouseUp = function () {
  crainTimer.ticking = true;
};

//==============================
//
//==============================
chain.onMouseDown = function () {
  craneDown();
};

//==============================
//
//==============================
chain.onMouseUp = function () {
  crainTimer.ticking = true;
};

//===========================================
//
//===========================================
function craneDown() {
  if ( theClockTimer.ticking == true ) {
    crane.src = "Resources/craneDown.png";
    chain.hoffset = 11* scale;
    chain.voffset = 92* scale;
    animateTheClock();
  }
}

//===========================================
//  spins the clock hands and cogs
//===========================================
function animateTheClock() {

    if (preferences.soundpref.value === "enable") {
        play(creturn, false);
    }
    theClockTimer.ticking=false;

    var a,b,c,d,e,f,g;
	cogrotation = cogrotation + 1000;
	a = new RotateAnimation(cog, cogrotation, 990, animator.kEaseOut);
	b = new RotateAnimation(cogShadow, cogrotation, 990, animator.kEaseOut);
	c = new RotateAnimation(monthCog, cogrotation, 990, animator.kEaseOut);
	d = new RotateAnimation(smallCog, cogrotation, 990, animator.kEaseOut);
	e = new RotateAnimation(wheel, cogrotation, 990, animator.kEaseOut);
        var ff =  theClock.hourHand.rotation;
        var gg =  theClock.minuteHand.rotation;
	f = new RotateAnimation(theClock.hourHand, 1080 + ff, 3990, animator.kEaseOut);
	g = new RotateAnimation(theClock.minuteHand, 1080 + gg, 4590, animator.kEaseOut, tingMe );
	animator.start([
		a, b, c, d, e, f, g
	]);
	cogrotation = 32;
}



//===========================================
//
//===========================================
function craneUp() {
    crane.src = "Resources/crane.png";
    chain.hoffset = 7 * scale;
    chain.voffset = 73* scale;
    crainTimer.ticking = false;
    //print("here");
}
//===========================================
//
//===========================================
function tingMe() {
    if (preferences.soundpref.value === "enable") {
        play(tingingSound, false);
    }
    updateTime();
    theClockTimer.ticking = true;
         if (theClock.internals.visible == true) {
        theClock.internals.visible = false;
     }  else {
        theClock.internals.visible = true;
     }
}




