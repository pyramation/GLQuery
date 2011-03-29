jQuery.format = function()
{
	var str=arguments[0];
	str = str.replace(/`/g,"\"");
	var size = arguments.length;
	for (var i = 0; i<size; i++)
	{
		var replaceThis = "\\{"+i+"\\}";
		var withThis = arguments[i+1];

		var re = new RegExp( replaceThis, "g" );
		str = str.replace(re , withThis );
	}
	return str;
};
jQuery.implode = function( delimit, array )
{
	return array.join( delimit );
};
jQuery.explode = function( delimit, string )
{
	return string.split( delimit );
};
jQuery.json_decode = function ( string )
{
	return jQuery.parseJSON( string );
};
jQuery.json_encode = function ( array )
{
	return jQuery.encode( array );
};
jQuery.str_replace = function( from, to, str, regex )
{
	if ( regex === true )
	{
		from = from.replace( '$', '\\$' );
		from = from.replace( '}', '\\}' );
		from = from.replace( '{', '\\{' );
	}
	return str.replace( new RegExp( from, 'g' ), to );
};
jQuery.str_contains = function( haystack, needle )
{
	return haystack.indexOf( needle ) != -1;
};

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
GLQuery.fnc_on_keydown = function( e )
{
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

/**
Helper function to get the date
/**/
function fnc_now()
{
	return new Date().getTime();
}

/** Time of the last mousemove */
GLQuery.int_last_mousemove = 0;
/** Object last hovered */
GLQuery.obj_hovered_last;


/**
Handling mouse moves (detects mouseover, mouseout)
/**/
GLQuery.fnc_on_mousemove = function( event )
{
	
	/**
	Only poll every 1000 miliseconds
	/**/
	var int_now = fnc_now();
	if ( GLQuery.int_last_mousemove + 1000 > int_now ) return;
	GLQuery.int_last_mousemove = int_now;
	
	/** Hovered objects */
	var obj_intersects = GLQuery.fnc_determine_intersect( event );
	
	
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

GLQuery.fnc_event_pick = function( obj_intersects, str_event, str_options, event )
{
	fnc_handle_event( obj_intersects, GLQuery.arr_fnc[ str_event ][ obj_intersects.date ], event );
	if ( str_options !== '' )
	{
		fnc_handle_event( obj_intersects, GLQuery.arr_fnc[ str_options + str_event ][ obj_intersects.date ], event );
	}
};
/**
On mouse click or mousewheel
/**/
GLQuery.fnc_on_mouse = function( event )
{
	event = event.originalEvent;
//	echo( event );
	var obj_intersects = GLQuery.fnc_determine_intersect( event );
	if ( obj_intersects === null ) return;
	
	var str_keys = '';
	if ( event.altKey === true ) str_keys += 'Alt+';
	if ( event.ctrlKey === true ) str_keys += 'Ctrl+';
	if ( event.shiftKey === true ) str_keys += 'Shift+';
	
	/**
	Mousewheel
	/**/
	var bool_wheel_event = jQuery.str_contains( event.type, 'wheel' );
	
	/** Wheel event */
	if ( bool_wheel_event === true )
	{
		if ( event.detail !== undefined ) int_magnitude = event.detail;
		if ( event.wheelDelta !== undefined ) int_magnitude = event.wheelDelta;
	
		GLQuery.fnc_event_pick( obj_intersects, 'Wheel', str_keys, event );
		/** Mousehweel down */
		if ( int_magnitude < 0 )
		{	
			GLQuery.fnc_event_pick( obj_intersects, 'WheelDown', str_keys, event );
		}
		/** Mousewheel up */
		else
		{
			GLQuery.fnc_event_pick( obj_intersects, 'WheelUp', str_keys, event );
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
		GLQuery.fnc_event_pick( obj_intersects, str_bttn, str_keys, event );
	}
		
}

GLQuery.fnc_init_event_listeners = function()
{
	/**
	Global event listeners
	/**/
	jQuery( document ).bind( 'mousemove', GLQuery.fnc_mouselook );
	jQuery( document ).bind( 'keydown', GLQuery.fnc_on_keydown );
	jQuery( GLQuery.dom_element ).bind( 'mousemove', GLQuery.fnc_on_mousemove );
	jQuery( GLQuery.dom_element ).bind( 'mouseup', GLQuery.fnc_on_mouse );
	jQuery( GLQuery.dom_element ).bind( 'mousewheel', GLQuery.fnc_on_mouse );
	jQuery( GLQuery.dom_element ).bind( 'contextmenu', function(e) { e.preventDefault(); } );
};

GLQuery.fnc_determine_intersect = function( event )
{
	var vector = new THREE.Vector3( ( event.clientX / GLQuery.int_width ) * 2 - 1, - ( event.clientY / GLQuery.int_height ) * 2 + 1, 0.5 );
	GLQuery.projector.unprojectVector( vector, GLQuery.camera );

	var ray = new THREE.Ray( GLQuery.camera.position, vector.subSelf( GLQuery.camera.position ).normalize() );

	var intersects = ray.intersectScene( GLQuery.scene );
	
	/** If we have a valid selection */
	if ( intersects.length > 0 && ! intersects[ 0 ].object.static )
	{
		return intersects[ 0 ].object;
	}
	return null;
}

/**
Select and unselect (with wireframe)
/**/
GLQuery.prototype.select = function()
{
	if ( this.isEmpty() ) return this;

	/** Unselect the selected object */
	$3('#selected').unselect();
	
	/**
	Add wireframe
	/**/
	if ( this.wireframe !== undefined )
	{
		//echo('Already has one');
		return; //Already has one
	}
	
	/** The mesh */
	var obj_wireframe_mesh =
	GLQuery.fnc_add_object_wireframe( this.obj.geometry, this.obj.position, this.obj.rotation, this.obj.scale );
	
	/** The GLQuery object representing the wireframe */
	var obj_wireframe = new GLQuery( null, obj_wireframe_mesh, 'wireframe' );
	
	obj_wireframe.date = this.obj.date;
	//obj_wireframe_mesh.date = this.obj.date;
	
	this.wireframe = obj_wireframe;
	
	/** Set the current object as selected */
	GLQuery.set( 'selected', this );
	return this;
}
GLQuery.prototype.unselect = function()
{
	if ( this.isEmpty() ) return this;

	if ( this.wireframe === undefined ) return this;
	
	GLQuery.scene.removeObject( this.wireframe.obj );
	this.wireframe = undefined;
	//this.removeClass
	return this;
}



GLQuery.fnc_get_factor = function( factor )
{
	if ( factor === undefined ) return 1;
	return factor;
};
GLQuery.fnc_orbit_horiz = function( target, factor )
{
	factor = GLQuery.fnc_get_factor( factor );
	$3('#camera').orbit( target, factor * GLQuery.float_rotation_speed );
	$3('#target').orbit( target, factor * GLQuery.float_rotation_speed );
}
GLQuery.fnc_orbit_vert = function( target, factor )
{
	factor = GLQuery.fnc_get_factor( factor );
	$3('#camera').orbitVert( target, factor * GLQuery.float_rotation_speed );
	$3('#target').orbitVert( target, factor * GLQuery.float_rotation_speed );
}



GLQuery.getPositionVector = function( target )
{
	/** If it's a vector, return it directly */
	if ( target.x !== undefined ) return target;
	
	/** If it is not a vector, return the vector of the object */
	var obj = GLQuery.getObj( target );
	return obj.getPosition();
	/*
	if ( obj === undefined ) return null;
	if ( target.x === undefined ) return obj.obj.position;
	if ( obj.isEmpty() ) return null;
	
	return target;
	*/
}
GLQuery.getObj = function( target )
{

	if ( typeof target === 'object' ) return GLQuery.arr_objects[ target.date ];
	if ( typeof target === 'string' ) return GLQuery.selector( target );
	return target;
}

GLQuery.prototype.addClass = function( str )
{
	this.class = str;
	return this;
};
GLQuery.prototype.setName = function( str )
{
	this.name = str;
	return this;
};

GLQuery.prototype.getPosition = function()
{
	return this.obj.position;
};



/**
Object processing logic
/**/
GLQuery.prototype.isEmpty = function()
{
	return this.obj === null;
}
GLQuery.prototype.processSiblings = function( args )
{
	if ( this.wireframe !== undefined )
	{
		args.callee.apply( this.wireframe, args );
	}
}
GLQuery.prototype.hasMany = function( args )
{
	if ( this.many !== undefined )
	{
		for( var index in this.many )
		{
			args.callee.apply( this.many[ index ], args );
		}
		return true;
	}
	return false;
}
GLQuery.prototype.inspect = function( args )
{
	if ( this.isEmpty() ) return true;
	if ( this.hasMany( args ) ) return true;
	this.processSiblings( args );
	return false;
};
/**
Vector processing
/**/
GLQuery.prototype.translate_z = function( target, float_amount )
{
	/** The position of the target */
	var pos = GLQuery.getPositionVector( target );

	var vector = pos.clone()
		.subSelf( this.obj.position )
		.normalize()
		.multiplyScalar( float_amount );
	
	return this.obj.position.clone().subSelf( vector );
	//return pos.clone().subSelf( vector );
}
GLQuery.prototype.rotateY = function( float_angle, bool_static )
{
	THREE.Matrix4.rotationAxisAngleMatrix ( GLQuery.vec3_y_up, float_angle ).multiplyVector3( this.obj.position );
};
GLQuery.prototype.rotateX = function( float_angle, bool_static )
{
	THREE.Matrix4.rotationAxisAngleMatrix ( GLQuery.vec3_x_east, float_angle ).multiplyVector3( this.obj.position );
};
GLQuery.prototype.rotateZ = function( float_angle, bool_static )
{
	THREE.Matrix4.rotationAxisAngleMatrix ( GLQuery.vec3_z_south, float_angle ).multiplyVector3( this.obj.position );
};
GLQuery.prototype.rotateAround = function( float_angle, vec3 )
{
	THREE.Matrix4.rotationAxisAngleMatrix ( vec3, float_angle ).multiplyVector3( this.obj.position );
};
/**
Object methods
/**/

GLQuery.prototype.setRotation = function( x, y, z )
{
	x = x * 1; y = y * 1; z = z * 1;
	this.obj.rotation.x = x;
	this.obj.rotation.y = y;
	this.obj.rotation.z = z;
	this.obj.updateMatrix();
	
	if ( this.wireframe === undefined ) return this;
	this.wireframe.setRotation( x, y, z );
	
	return this;
};
GLQuery.prototype.setPosition = function( x, y, z )
{
	x = x * 1; y = y * 1; z = z * 1;
	this.obj.position.x = x;
	this.obj.position.y = y;
	this.obj.position.z = z;
	this.obj.updateMatrix();
	
	if ( this.wireframe === undefined ) return this;
	this.wireframe.setPosition( x, y, z );
	
	return this;
};
GLQuery.prototype.setScale = function( x, y, z )
{
	x = x * 1; y = y * 1; z = z * 1;
	this.obj.scale.x = x;
	this.obj.scale.y = y;
	this.obj.scale.z = z;
	this.obj.updateMatrix();
	
	if ( this.wireframe === undefined ) return this;
	this.wireframe.setScale( x, y, z );
	
	return this;
};
GLQuery.prototype.scale = function( float_amount )
{
	if ( this.inspect( arguments ) ) return this;
	
	this.obj.scale.x  = this.obj.scale.y = this.obj.scale.z *= ( float_amount );
	this.obj.updateMatrix();
};
GLQuery.prototype.rotate = function( float_amount )
{
	if ( this.inspect( arguments ) ) return this;
	
	this.obj.rotation.y += ( float_amount );
	this.obj.updateMatrix();
};
GLQuery.prototype.advance = function( target, float_amount, float_time )
{
	if ( this.inspect( arguments ) ) return this;
	
	if( float_time === undefined )
	{
		this.obj.position = this.translate_z( target, float_amount ).clone();
	}
	/** Else, translate */
	else
	{
		this.tween( this.translate_z( target, float_amount ), float_time );
	}
};
GLQuery.prototype.translate = function( target, float_factor )
{
	if ( this.inspect( arguments ) ) return this;
	
	var pos = GLQuery.getPositionVector( target );
	if ( pos === null ) return this;
	
	if ( float_factor === undefined  ) float_factor = 1;
	//this.obj.position = 
	THREE.Matrix4.translationMatrix (
		pos.x * float_factor
	,	pos.y * float_factor
	,	pos.z * float_factor ).multiplyVector3( this.obj.position );
	return this;
};
GLQuery.prototype.tween = function( to, float_time )
{
	if ( this.inspect( arguments ) ) return this;
	
	var vec3_to = GLQuery.getPositionVector( to );
	if ( vec3_to === null ) return this;
	
	GLQuery.fnc_tween( this.obj.position, vec3_to, float_time, 14 );
	return this;
};
GLQuery.prototype.orbit = function ( target, float_angle )
{
	if ( this.inspect( arguments ) ) return this;
	

	var pos = GLQuery.getPositionVector( target );

	if ( pos === null ) return;
	pos = pos.clone();
	
	var vec3_orig = this.obj.position.clone();
	
	this.translate( pos, -1 );
	this.rotateY( float_angle );
	this.translate( pos, 1 );
	
	var vec3_target = this.obj.position.clone();
	this.obj.position = vec3_orig;
	
	this.tween( vec3_target, 1000 );
};
GLQuery.prototype.orbitVert = function ( target, float_angle )
{
	if ( this.inspect( arguments ) ) return this;
	

	var pos = GLQuery.getPositionVector( target );
	if ( pos === null ) return;
	pos = pos.clone();
	
	//this.translate( pos, -1 );
	
	var vec3_orig = this.getPosition().clone();
	
	var vec3_this = this.getPosition().clone();
	var vec3_target = GLQuery.getObj( target ).getPosition().clone();
	var vec3_target0 = GLQuery.getObj( target ).getPosition().clone();
	vec3_target0.y = 0;
	
	var vec3_normal = vec3_this.subSelf( vec3_target ).crossSelf( vec3_target0.subSelf( vec3_target ) ).normalize();
	
	
	this.rotateAround( float_angle, vec3_normal );
	
	var vec3_target = this.getPosition().clone();
	this.obj.position = vec3_orig;
	
	this.tween( vec3_target, 1000 );
};
GLQuery.prototype.setTexture = function( str_url_texture )
{
	this.obj.materials[ 0 ] = new THREE.MeshBasicMaterial( { map : ImageUtils.loadTexture( str_url_texture ) } );
	this.obj.updateMatrix();
};
GLQuery.loadDynamic = function( str_url_obj, str_url_texture, str_name, str_class, fnc_callback )
{
	var mesh_dummy = {};
	var $3_obj = GLQuery.add( str_name, mesh_dummy ).addClass( str_class );
	with ( { $3_obj : $3_obj, mesh_dummy : mesh_dummy, fnc_callback : fnc_callback } )
	{
		$.get( str_url_obj,
		function( str_data )
		{
			$3_obj.obj = GLQuery.fnc_obj_from_str( str_data, str_url_texture );
			
			$3_obj.obj.date = mesh_dummy.date;
			
			/** If there is a callback function */
			if ( fnc_callback !== undefined )
			{
				fnc_callback.call( $3_obj.obj );
			}
		} );
	}
	return $3_obj;
}
GLQuery.fnc_obj_from_str = function( str_obj, str_url_texture )
{
	var int_area = 1;
	var int_offset =  GLQuery.arr_objects.length;
	
	var obj_position = { x : 25, y : 25, z : 25 };
	var obj_rotation = { x:0, y:0, z:0 };
	var int_scale = 1;

	
	var texture = GLQuery.fnc_load_texture( str_url_texture );
	//var texture = new THREE.MeshBasicMaterial( { env_map: ImageUtils.loadTexture( str_url_texture, new THREE.SphericalReflectionMapping() ) } );
	//var texture =  new THREE.MeshBasicMaterial( { map : ImageUtils.loadTexture( str_url_texture ) } );
	//var texture = GLQuery.fnc_get_special_material( str_url_texture );

	var geometry = new Obj_from_str( str_obj );
	
	return GLQuery.fnc_add_object( geometry, texture, obj_position, obj_rotation, int_scale, true );
}