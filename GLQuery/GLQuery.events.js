var Key = { backspace : 8, tab : 9, enter : 13, shift : 16, ctrl : 17, alt : 18, pausebreak : 19, capslock : 20, escape : 27, space : 32, pageup : 33, pagedown : 34, end : 35, home : 36, leftarrow : 37, uparrow : 38, rightarrow : 39, downarrow : 40, insert : 45, _delete : 46, _0 : 48, _1 : 49, _2 : 50, _3 : 51, _4 : 52, _5 : 53, _6 : 54, _7 : 55, _8 : 56, _9 : 57, a : 65, b : 66, c : 67, d : 68, e : 69, f : 70, g : 71, h : 72, i : 73, j : 74, k : 75, l : 76, m : 77, n : 78, o : 79, p : 80, q : 81, r : 82, s : 83, t : 84, u : 85, v : 86, w : 87, x : 88, y : 89, z : 90, leftwindowkey : 91, rightwindowkey : 92, selectkey : 93, numpad0 : 96, numpad1 : 97, numpad2 : 98, numpad3 : 99, numpad4 : 100, numpad5 : 101, numpad6 : 102, numpad7 : 103, numpad8 : 104, numpad9 : 105, multiply : 106, add : 107, subtract : 109, decimalpoint : 110, divide : 111, f1 : 112, f2 : 113, f3 : 114, f4 : 115, f5 : 116, f6 : 117, f7 : 118, f8 : 119, f9 : 120, f10 : 121, f11 : 122, f12 : 123, numlock : 144, scrolllock : 145, semicolon : 186, equalsign : 187, comma : 188, dash : 189, period : 190, forwardslash : 191, graveaccent : 192, openbracket : 219, backslash : 220, closebraket : 221, singlequote : 222 };

/**
Handling keydown events
/**/
GLQuery.keydown = function ( int_case, fnc )
{
	if ( GLQuery.arr_fnc_keydown[ int_case ] === undefined )
	{
		GLQuery.arr_fnc_keydown[ int_case ] = [];
	}
	GLQuery.arr_fnc_keydown[ int_case ].push( fnc );
	return GLQuery;
};
GLQuery.arr_fnc_keydown = [];
GLQuery.bool_keyboard = true;
GLQuery.on_keydown = function( e )
{
	if ( GLQuery.bool_keyboard === false ) return;
	
	if ( GLQuery.arr_fnc_keydown[ e.which ] === undefined ) return;

	for( int_index in GLQuery.arr_fnc_keydown[ e.which ] )
	{
		 GLQuery.arr_fnc_keydown[ e.which ][ int_index ].call( null );
	}
}

/**
Handling mouseover events
/**/
GLQuery.arr_fnc = [];

GLQuery.arr_fnc[ 'mouseover' ] = [];
GLQuery.arr_fnc[ 'mouseout' ] = [];

GLQuery.arr_fnc[ 'Click' ] = [];
GLQuery.arr_fnc[ 'Alt+Click' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Click' ] = [];
GLQuery.arr_fnc[ 'Shift+Click' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Click' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Shift+Click' ] = [];
GLQuery.arr_fnc[ 'Alt+Shift+Click' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Shift+Click' ] = [];

GLQuery.arr_fnc[ 'MClick' ] = [];
GLQuery.arr_fnc[ 'Alt+MClick' ] = [];
GLQuery.arr_fnc[ 'Ctrl+MClick' ] = [];
GLQuery.arr_fnc[ 'Shift+MClick' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+MClick' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Shift+MClick' ] = [];
GLQuery.arr_fnc[ 'Alt+Shift+MClick' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Shift+MClick' ] = [];

GLQuery.arr_fnc[ 'RClick' ] = [];
GLQuery.arr_fnc[ 'Alt+RClick' ] = [];
GLQuery.arr_fnc[ 'Ctrl+RClick' ] = [];
GLQuery.arr_fnc[ 'Shift+RClick' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+RClick' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Shift+RClick' ] = [];
GLQuery.arr_fnc[ 'Alt+Shift+RClick' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Shift+RClick' ] = [];

GLQuery.arr_fnc[ 'Wheel' ] = [];
GLQuery.arr_fnc[ 'Alt+Wheel' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Wheel' ] = [];
GLQuery.arr_fnc[ 'Shift+Wheel' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Wheel' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Shift+Wheel' ] = [];
GLQuery.arr_fnc[ 'Alt+Shift+Wheel' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Shift+Wheel' ] = [];

GLQuery.arr_fnc[ 'WheelUp' ] = [];
GLQuery.arr_fnc[ 'Alt+WheelUp' ] = [];
GLQuery.arr_fnc[ 'Ctrl+WheelUp' ] = [];
GLQuery.arr_fnc[ 'Shift+WheelUp' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+WheelUp' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Shift+WheelUp' ] = [];
GLQuery.arr_fnc[ 'Alt+Shift+WheelUp' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Shift+WheelUp' ] = [];

GLQuery.arr_fnc[ 'WheelDown' ] = [];
GLQuery.arr_fnc[ 'Alt+WheelDown' ] = [];
GLQuery.arr_fnc[ 'Ctrl+WheelDown' ] = [];
GLQuery.arr_fnc[ 'Shift+WheelDown' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+WheelDown' ] = [];
GLQuery.arr_fnc[ 'Ctrl+Shift+WheelDown' ] = [];
GLQuery.arr_fnc[ 'Alt+Shift+WheelDown' ] = [];
GLQuery.arr_fnc[ 'Alt+Ctrl+Shift+WheelDown' ] = [];

GLQuery.prototype.bind = function( str_event, fnc )
{
	if ( this.hasMany( arguments ) ) return this;
	
	if ( GLQuery.arr_fnc[ str_event ][ this.obj.date ] === undefined )
	{
		GLQuery.arr_fnc[ str_event ][ this.obj.date ] = [];
	}
	GLQuery.arr_fnc[ str_event ][ this.obj.date ].push( fnc );
	
	return this;
};


GLQuery.prototype.mouseout = function( fnc ) { return this.bind( 'mouseout', fnc ); };
GLQuery.prototype.mouseover = function( fnc ) { return this.bind( 'mouseover', fnc ); };
GLQuery.prototype.click = function( fnc ) {	return this.bind( 'click', fnc ); };
GLQuery.prototype.wheel = function( fnc ) { return this.bind( 'wheel', fnc ); };

/**
General purpose function for calling functions
/**/
function fnc_handle_event( obj, arr_functions, event )
{
	if ( arr_functions !== undefined )
	{
		for( var int_index in arr_functions )
		{
			arr_functions[ int_index ].call( obj, event );
		}
	}
}



/** Time of the last mousemove */
GLQuery.int_last_mousemove = 0;
/** Object last hovered */
GLQuery.obj_hovered_last;


/**
Handling mouse moves (detects mouseover, mouseout)
/**/
GLQuery.on_mousemove = function( event )
{
	
	/**
	Only poll every 1000 miliseconds
	/**/
	var int_now = time();
	if ( GLQuery.int_last_mousemove + 1000 > int_now ) return;
	GLQuery.int_last_mousemove = int_now;
	
	/** Hovered objects */
	var obj_intersects = GLQuery.determine_intersect( event );
	
	
	/**
	Determine mouseout events
	/**/
	if ( GLQuery.obj_hovered_last && ( GLQuery.obj_hovered_last !== obj_intersects ) )
	{
		var arr_functions = GLQuery.arr_fnc[ 'mouseout' ][ GLQuery.obj_hovered_last.date ];
		fnc_handle_event( GLQuery.obj_hovered_last, arr_functions, event );
	}
	/** Mark it as being the last object hovered */
	GLQuery.obj_hovered_last = obj_intersects;
	
	/** From this point onwards we only care about actual hovered objects*/
	if ( obj_intersects === null ) return;
	
	/**
	Determine mouseover events
	/**/
	var arr_functions = GLQuery.arr_fnc[ 'mouseover' ][ obj_intersects.date ];
	fnc_handle_event( obj_intersects, arr_functions, event );
}

GLQuery.event_pick = function( obj_intersects, str_event, str_options, event )
{
	//fnc_handle_event( obj_intersects, GLQuery.arr_fnc[ str_event ][ obj_intersects.date ], event );
	//if ( str_options !== '' )
	{
		fnc_handle_event( obj_intersects, GLQuery.arr_fnc[ str_options + str_event ][ obj_intersects.date ], event );
	}
};
/**
On mouse click or mousewheel
/**/
GLQuery.on_mouse = function( event )
{
	event.preventDefault();
	event = event.originalEvent;
//	echo( event );
	var obj_intersects = GLQuery.determine_intersect( event );
	if ( obj_intersects === null ) return;
	
	var str_keys = '';
	if ( event.altKey === true ) str_keys += 'Alt+';
	if ( event.ctrlKey === true ) str_keys += 'Ctrl+';
	if ( event.shiftKey === true ) str_keys += 'Shift+';
	
	/**
	Mousewheel
	/**/
	var bool_wheel_event = event.type.contains( 'wheel' );
	
	/** Wheel event */
	if ( bool_wheel_event === true )
	{
		if ( event.detail !== undefined ) int_magnitude = event.detail;
		if ( event.wheelDelta !== undefined ) int_magnitude = event.wheelDelta;
	
		GLQuery.event_pick( obj_intersects, 'Wheel', str_keys, event );
		/** Mousehweel down */
		if ( int_magnitude < 0 )
		{	
			GLQuery.event_pick( obj_intersects, 'WheelDown', str_keys, event );
		}
		/** Mousewheel up */
		else
		{
			GLQuery.event_pick( obj_intersects, 'WheelUp', str_keys, event );
		}
	}
	/**
	Click
	/**/
	else
	{
		var str_bttn = '';
		if ( event.which === 1 ) str_bttn = 'Click';
		if ( event.which === 2 ) str_bttn = 'MClick';
		if ( event.which === 3 ) str_bttn = 'RClick';
		GLQuery.event_pick( obj_intersects, str_bttn, str_keys, event );
	}
		
}

GLQuery.init_event_listeners = function()
{
	/**
	Global event listeners
	/**/
	jQuery( document ).bind( 'mousemove', GLQuery.mouselook );
	jQuery( document ).bind( 'keydown', GLQuery.on_keydown );
	jQuery( GLQuery.dom_element ).bind( 'mousemove', GLQuery.on_mousemove );
	jQuery( GLQuery.dom_element ).bind( 'mouseup', GLQuery.on_mouse );
	jQuery( GLQuery.dom_element ).bind( 'mousewheel', GLQuery.on_mouse );
	jQuery( GLQuery.dom_element ).bind( 'contextmenu', function(e) { e.preventDefault(); } );
};