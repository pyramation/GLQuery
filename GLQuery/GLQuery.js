String.format = function()
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
Array.implode = function( delimit, array )
{
	return array.join( delimit );
};
String.explode = function( delimit, string )
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
String.prototype.startsWith = function( str ) 
{
	return ( this.match( new RegExp( '^' + str ) ) == str );
}
String.prototype.endsWith = function( str ) 
{
	return ( this.match( new RegExp( str + '$' ) ) == str );
}
String.prototype.contains = function( str ) 
{
	return this.indexOf( str ) != -1;
}
var echo = function( obj )
{
	try
	{
		console.log( obj );
	}
	catch( x )
	{
	}
};
Math.round_number = function( num, dec )
{
	return Math.round( num * Math.pow( 10, dec ) ) / Math.pow( 10, dec );
}

/**
Constructor
/**/
var GLQuery = function( str, obj, class )
{
	if ( obj === undefined )
	{
		/** If we're not creating anything, it means we are selecting */
		return GLQuery.getObj( str );
	}
	
	this.name = str;
	this.obj = obj;
	this.class = class;
	
	return this;
}
GLQuery.obj_empty = new GLQuery( null, null );
GLQuery.selector = function( str )
{
	if ( str === undefined ) return;

	if ( str.startsWith( '#' ) )
	{
		if ( GLQuery.arr_names[ str.substr( 1 ) ] !== undefined )
			return GLQuery.arr_names[ str.substr( 1 ) ];
		return GLQuery.obj_empty;
	}
	if ( str.startsWith( '.' ) )
	{
		var arr_result = [];
		for( index in GLQuery.arr_objects )
		{
			//echo( GLQuery.arr_objects[ index ] );
			//echo( 'comparing ' + GLQuery.arr_objects[ index ].class + ' to ' + str.substr( 1 ) );
			if ( GLQuery.arr_objects[ index ].class == str.substr( 1 ) )
			{
				//echo('adding');
				//echo( GLQuery.arr_objects[ index ] );
				arr_result.push( GLQuery.arr_objects[ index ] );
			}
		}
		var x = new GLQuery();
		x.many = arr_result;
	//	echo ( x );
		return x;
	}
};

var $3 = GLQuery;
GLQuery.prototype.name;
GLQuery.prototype.obj;
GLQuery.prototype.class;

/**
Add & Select
/**/
GLQuery.arr_names = [];
GLQuery.arr_objects = [];
GLQuery.add = function( str, obj )
{
	var result = new GLQuery( str, obj );
	GLQuery.arr_names[ str ] = result;
	obj.date = fnc_now();
	
	GLQuery.arr_objects[ obj.date ] = result;
	return result;
}
GLQuery.set = function( str, obj )
{
	GLQuery.arr_names[ str ] = obj;
}
/**
Static fields
/**/
GLQuery.bool_stats_enabled = true;
GLQuery.container;
GLQuery.stats;
GLQuery.camera;
GLQuery.arr_cameras;
GLQuery.scene;
GLQuery.renderers = [];
GLQuery.renderer;
GLQuery.mesh_cursor;
GLQuery.arr_functions = [];
GLQuery.mesh
//zmesh
//lightMesh
//geometry;
GLQuery.int_mouse_x = 0;
GLQuery.int_mouse_y = 0
GLQuery.int_mouse_x_old = 0;
GLQuery.int_mouse_y_old = 0
GLQuery.bool_mouselook = false;
GLQuery.bool_mousemoved = false;

function fnc_closure( context, fnc )
{
	return function( e )
	{
		fnc.call( context, e );
	}
}
/**
Methods
/**/
GLQuery.init = function( int_width, int_height, parent, count )
{
	GLQuery.int_width = int_width;
	GLQuery.int_height = int_height;
	
	GLQuery.float_window_half_x = int_width / 2;
	GLQuery.float_window_half_y = int_height / 2;

	GLQuery.scene = new THREE.Scene();
	
	var dom_parent;
	if ( typeof parent === 'string' ) dom_parent = document.getElementById( parent );
	if ( typeof parent === 'object' ) dom_parent = parent;
	
	
	for ( var i = 0; i < count; i++ )
	{
		GLQuery.fnc_init_renderer( int_width, int_height, dom_parent );
	}
	
	/** Init the event listeners */
	GLQuery.fnc_init_event_listeners();
	
	setInterval( GLQuery.fnc_main_loop, 1000 / 60 ); //16 fps
	return this;
}


GLQuery.fnc_init_camera = function( int_width, int_height )
{
	//( fov, aspect, near, far )
	var camera = new THREE.Camera( 60, int_width / int_height, 10, 1000*100 );
	
	camera.position.z = 1500;
	camera.position.y = 500;
	camera.target.position.x = camera.position.x + 10;
	
	return camera;
}
/** Init the canvas */
GLQuery.fnc_init_stats = function()
{
	GLQuery.stats = new Stats();
	GLQuery.stats.domElement.style.position = 'absolute';
	GLQuery.stats.domElement.style.top = '0px';
	GLQuery.stats.domElement.style.zIndex = 100;
	GLQuery.container.appendChild( GLQuery.stats.domElement );
	GLQuery.arr_functions[ 'stats' ] = GLQuery.stats.update;
}
GLQuery.fnc_init_renderer = function( int_width, int_height, dom_parent )
{
	GLQuery.container = dom_parent;
	
	GLQuery.projector = new THREE.Projector();
	//GLQuery.scene.fog = new THREE.Fog( 0xffffff, 1, 10000 );

	/** If this is set to true, antialising is enabled */
	var renderer = new THREE.WebGLRenderer2( false );
	renderer.setSize( int_width, int_height  );
	
	var camera = GLQuery.fnc_init_camera( int_width, int_height );
	GLQuery.renderers.push(
	{
		renderer : renderer
	,	camera : camera
	} );
	
	// GLQuery.renderer.sortObjects = false;
	//GLQuery.renderer.domElement.className = 'drawing_surface';
	
	GLQuery.container.appendChild( renderer.domElement );
	GLQuery.dom_element = renderer.domElement;
	
	renderer.domElement.style.cursor = 'crosshair';
	
	with ( { camera : camera } )
	{
		var fnc_select_camera = function()
		{
			GLQuery.add( 'camera', camera );
			GLQuery.add( 'target', camera.target );
			GLQuery.camera = camera;
		};
		renderer.domElement.addEventListener( 'click', fnc_select_camera, true );
		fnc_select_camera();
	}
	
	
	return this;
}
GLQuery.fnc_draw_minimap = function()
{
	GLQuery.debugContext.clearRect( -256, -256, GLQuery.int_width, GLQuery.int_height );
 
	GLQuery.debugContext.beginPath();

	// center
	GLQuery.debugContext.moveTo( -10, 0 );
	GLQuery.debugContext.lineTo( 10, 0 );
	GLQuery.debugContext.moveTo( 0, -10 );
	GLQuery.debugContext.lineTo( 0, 10 );

	// GLQuery.camera

	GLQuery.debugContext.moveTo( GLQuery.camera.position.x * 0.1, GLQuery.camera.position.z * 0.1 );
	GLQuery.debugContext.lineTo( GLQuery.camera.target.position.x * 0.1, GLQuery.camera.target.position.z * 0.1 );
	GLQuery.debugContext.rect( GLQuery.camera.position.x * 0.1 - 5, GLQuery.camera.position.z * 0.1 - 5, 10, 10 );
	GLQuery.debugContext.rect( GLQuery.camera.target.position.x * 0.1 - 5, GLQuery.camera.target.position.z * 0.1 - 5, 10, 10 );
	GLQuery.debugContext.rect( - 50, - 50, 100, 100 );
	
	
	for( i = 0, l = GLQuery.arr_objects.length; i < l; i++ ) {

		var object = GLQuery.arr_objects[ i ].obj;

		GLQuery.debugContext.rect( object.position.x * 0.1 - 5, object.position.z * 0.1 - 5, 10, 10 );

	}
				
				
	GLQuery.debugContext.closePath();
	GLQuery.debugContext.stroke();
	
	return this;
}
GLQuery.fnc_add_minimap = function()
{
	/**
	Minimap
	/**/
	GLQuery.debugCanvas = document.createElement( 'canvas' );
	GLQuery.debugCanvas.width = GLQuery.int_width;
	GLQuery.debugCanvas.height = GLQuery.int_height;
	GLQuery.debugCanvas.style.position = 'absolute';
	GLQuery.debugCanvas.style.top = '0px';
	GLQuery.debugCanvas.style.left = '0px';

	GLQuery.container.appendChild( GLQuery.debugCanvas );

	GLQuery.debugContext = GLQuery.debugCanvas.getContext( '2d' );
	GLQuery.debugContext.setTransform( 1, 0, 0, 1, 256, 256 );
	GLQuery.debugContext.strokeStyle = '#000000';
	

	
	
	
	GLQuery.arr_functions[ 'minimap' ] = GLQuery.fnc_draw_minimap;
	return this;
}
/** Generate a texture */
GLQuery.generateTexture = function( r, g, b )
{
	var canvas = document.createElement( 'canvas' );
	canvas.loaded = true;
	canvas.width = 256;
	canvas.height = 256;

	var context = canvas.getContext( '2d' );
	var image = context.getImageData( 0, 0, 256, 256 );

	x = 0, y = 0, p = 0;

	for ( i = 0, j = 0, l = image.data.length; i < l; i += 4, j ++ )
	{
		x = j % 256;
		y = x == 0 ? y + 1 : y;
		p = Math.floor( x ^ y );

		image.data[ i ] = ~~ p * r;
		image.data[ i + 1 ] = ~~ p * g;
		image.data[ i + 2 ] = ~~ p * b;
		image.data[ i + 3 ] = 255;

	}

	context.putImageData( image, 0, 0 );

	return canvas;

}
GLQuery.fnc_load_texture = function( path )
{
	var image = new Image();
	var material = new THREE.MeshBasicMaterial( { map : new THREE.Texture( image ) } );
	with ( { material : material } )
	{
		image.onload = function()
		{
			this.loaded = true;
			material.map.image = this;
		};
	}
	image.src = path;

	return material;
}
GLQuery.fnc_get_material_wireframe = function()
{
	//Transparent with wireframe
	return [ new THREE.MeshBasicMaterial( { color: 0.2 * 0xffffff, opacity: 0.5 } ), new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, wireframe: true } ) ];
}
GLQuery.fnc_get_special_material = function( str_path )
{
	var texture2 = new THREE.Texture( GLQuery.generateTexture( 1, 1, 1 ), new THREE.SphericalReflectionMapping() );
	return new THREE.MeshBasicMaterial( { map: texture2, env_map: ImageUtils.loadTexture( str_path, new THREE.UVMapping() ) } );
};
GLQuery.fnc_get_random_material = function( index )
{
	var uniforms = ShaderUtils.lib[ 'basic' ].uniforms;
	var vertex_shader = ShaderUtils.lib[ 'basic' ].vertex_shader;
	var fragment_shader = ShaderUtils.lib[ 'basic' ].fragment_shader;

	var texture = new THREE.Texture( GLQuery.generateTexture( 0, 0.5, 1 ), new THREE.UVMapping() );
	var texture2 = new THREE.Texture( GLQuery.generateTexture( 0, 1, 0 ), new THREE.SphericalReflectionMapping() );

	var materials = [];
	//Many colors 
	materials.push( new THREE.MeshNormalMaterial() );
	//Cool reflections
	materials.push( new THREE.MeshBasicMaterial( { map: texture2, env_map: ImageUtils.loadTexture( '/textures/envmap.png', new THREE.UVMapping() ) } ) );
	
	
	//Solid color
	//materials.push( new THREE.MeshBasicMaterial( { color: 0x0066ff, blending: THREE.AdditiveBlending } ) );
	//Looks black
	//materials.push( new THREE.MeshBasicMaterial( { map: texture, fog: true } ) );
	//First black then dissapears
	//materials.push( new THREE.MeshBasicMaterial( { map: ImageUtils.loadTexture( '/textures/land_ocean_ice_cloud_2048.jpg' ) } ) );
	

	/*
	loadTexture( '/textures/cube/skybox/px.jpg' ), // right
					loadTexture( '/textures/cube/skybox/nx.jpg' ), // left
					loadTexture( '/textures/cube/skybox/py.jpg' ), // top
					loadTexture( '/textures/cube/skybox/ny.jpg' ), // bottom
					loadTexture( '/textures/cube/skybox/pz.jpg' ), // back
					loadTexture( '/textures/cube/skybox/nz.jpg' ) // front
 
 */

	//Transparent red
	//materials.push( new THREE.MeshShaderMaterial( { uniforms: uniforms, vertex_shader: vertex_shader, fragment_shader: fragment_shader } ) ); 
	//Metallic green - GLQuery CRASHES WEBGL IN CHROME
	//materials.push( THREE.MeshBasicMaterial( { map: texture, env_map: texture2 } ) );
	

	if ( index == undefined ) index = Math.floor( Math.random() * materials.length );
	return materials[ index ];
}

GLQuery.fnc_add_object_from_str = function( str )
{
	var int_area = 1;
	var int_offset =  GLQuery.arr_objects.length;
	for ( var i = int_offset; i < int_offset + 1; i ++ )
	{
		obj_position = {
			x : 25 * int_area * ( i + 1 )
		,	y : 25 * int_area * ( i + 1 )
		,	z : 25 * int_area * ( i + 1 )
		}
		obj_rotation = { x:0, y:0, z:0 };
		int_scale = ( i + 1 ) * int_area;
		GLQuery.fnc_add_object( new Obj_from_str( str ), GLQuery.fnc_get_random_material(), obj_position, obj_rotation, int_scale, true );
	}
	return this;
}
GLQuery.fnc_add_object_wireframe = function( geom, obj_position, obj_rotation, obj_scale )
{
	var int_area = 1;

	return GLQuery.fnc_add_object( new Obj_from_geom( geom ), GLQuery.fnc_get_material_wireframe(), obj_position, obj_rotation, obj_scale.x * 1.1, true, false );
}
/** Add an object to the GLQuery.scene */
GLQuery.fnc_add_object = function( geometry, material, obj_position, obj_rotation, int_scale, bool_auto_update, bool_static  )
{
	
	var mesh = new THREE.Mesh( geometry, material );

	mesh.doubleSided = false;
	mesh.overdraw = true;
	
	mesh.phase = Math.floor( Math.random() * 62.83 );
	mesh.phase = 0;
	
	mesh.rotation.x = obj_rotation.x;
	mesh.rotation.y = obj_rotation.y;
	mesh.rotation.z = obj_rotation.z;
	
	mesh.position.x = obj_position.x;
	mesh.position.y = obj_position.y;
	mesh.position.z = obj_position.z;
//	mesh.rotation.x = i * ( Math.PI / 180 ) + 1;
//	mesh.rotation.y = i * ( Math.PI / 180 ) + 1;

	mesh.scale.x = mesh.scale.y = mesh.scale.z = int_scale;
	mesh.updateMatrix();
	//mesh.autoUpdateMatrix = Math.floor( Math.random() * 1.9 );

	/**
	WALTER
	/**/
	mesh.autoUpdateMatrix = bool_auto_update;
	mesh.autoUpdateMatrix = true;
	GLQuery.scene.addObject( mesh );

	mesh.static = bool_static;
	//mesh.int_index = GLQuery.arr_objects.length;
	
	GLQuery.arr_objects.push( new GLQuery( '', mesh ) );
	//for ( k in GLQuery.arr_objects ) GLQuery.arr_objects[ k ].updateMatrix();
	return mesh;
}
GLQuery.fnc_add_earth = function( str_name )
{
	var geometry = new Sphere( 250, 32, 16 );
	geometry.computeVertexNormals();
	//GLQuery.material = GLQuery.fnc_load_texture('/textures/metal.jpg' );
	var material = GLQuery.fnc_load_texture('/textures/land_ocean_ice_cloud_2048.jpg' );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.overdraw = true;
	
	mesh.updateMatrix();
	mesh.position.x = Math.floor( Math.random() * 1000 );
	mesh.position.y = Math.floor( Math.random() * 1000 );
	mesh.position.z = Math.floor( Math.random() * 1000 );
	
	GLQuery.scene.addObject( mesh );
	return GLQuery.add( str_name, mesh );
	//GLQuery.earth = { obj : mesh };
	
	//mesh_cursor = mesh;
}

/**
Add a metal ball where the target should be
/**/

GLQuery.fnc_add_pellet = function()
{
	var geometry = new Sphere( 30, 32, 16 );
	geometry.computeVertexNormals();
	var material = GLQuery.fnc_load_texture( '/textures/metal.jpg' );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.overdraw = true;
	mesh.updateMatrix();
	mesh.bool_static = true;
	GLQuery.scene.addObject( mesh );
	return mesh;
}
GLQuery.fnc_add_target = function()
{
	var ambientLight = new THREE.AmbientLight( 0x444444 );
	GLQuery.scene.addLight( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff );
	GLQuery.pointLight = pointLight;

	GLQuery.scene.addLight( pointLight );

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.x = 1;
	directionalLight.position.y = 1;
	directionalLight.position.z = - 1;
	directionalLight.position.normalize();
	GLQuery.scene.addLight( directionalLight );

	GLQuery.mesh_cursor = GLQuery.fnc_add_pellet();
	GLQuery.arr_functions[ 'cursor' ] = function()
	{
		GLQuery.mesh_cursor.position = GLQuery.camera.target.position;
		GLQuery.pointLight.position = GLQuery.camera.position;
	}
	return this;


}



/**
Event listeners
/**/
GLQuery.fnc_mouselook_horiz = function()
{
	var int_abs = Math.abs( GLQuery.int_mouse_x );
	if ( int_abs > GLQuery.int_width * 0.5 * 0.9 )
	{
	
		return 10 * ( int_abs / GLQuery.int_mouse_x );
	}
	var diff = GLQuery.int_mouse_x - GLQuery.int_mouse_x_old;

	//GLQuery.int_mouse_x *= 0.0;
	//GLQuery.int_mouse_x_old *= 0.0;
	return ( diff );
}
GLQuery.fnc_mouselook_vert = function()
{
	var int_abs = Math.abs( GLQuery.int_mouse_y );
	if ( int_abs > GLQuery.int_height * 0.5 * 0.4 )
	{
		return 10 * ( int_abs / GLQuery.int_mouse_y );
	}

	var diff = GLQuery.int_mouse_y - GLQuery.int_mouse_y_old;
	return ( diff );
}
GLQuery.fnc_mouselook = function(event)
{
	/** L.E.: it needs to calculate even when mouselook is disabled, or else it will jump on resume */
	//if ( GLQuery.bool_mouselook === false ) return;
	
	/** If the mouse hasn't moved, set the boolean to false so it doesn't calculate for no reason */
	if ( GLQuery.int_mouse_x === GLQuery.int_mouse_x_old && GLQuery.int_mouse_y === GLQuery.int_mouse_y_old )
		GLQuery.bool_mousemoved = false;
	else
		GLQuery.bool_mousemoved = true;
	
	GLQuery.int_mouse_x_old = GLQuery.int_mouse_x;
	GLQuery.int_mouse_y_old = GLQuery.int_mouse_y;
	GLQuery.int_mouse_x = ( event.clientX - GLQuery.float_window_half_x ) * 1;
	GLQuery.int_mouse_y = ( event.clientY - GLQuery.float_window_half_y ) * 1;
}


GLQuery.fnc_tween = function( vec3_from, vec3_to, time, type )
{
	switch ( type )
	{
		case 1: tween_type = TWEEN.Easing.Quintic.EaseIn; break;
		case 2: tween_type = TWEEN.Easing.Quintic.EaseOut; break;
		case 3: tween_type = TWEEN.Easing.Quintic.EaseInOut; break;
		case 4: tween_type = TWEEN.Easing.Circular.EaseIn; break;
		case 5: tween_type = TWEEN.Easing.Circular.EaseOut; break;
		case 6: tween_type = TWEEN.Easing.Circular.EaseInOut; break;
		case 7: tween_type = TWEEN.Easing.Elastic.EaseIn; break;
		case 8: tween_type = TWEEN.Easing.Elastic.EaseOut; break;
		case 9: tween_type = TWEEN.Easing.Elastic.EaseInOut; break;
		case 10: tween_type = TWEEN.Easing.Back.EaseIn; break;
		case 11: tween_type = TWEEN.Easing.Back.EaseOut; break;
		case 12: tween_type = TWEEN.Easing.Back.EaseInOut; break;
		case 13: tween_type = TWEEN.Easing.Quadratic.EaseIn; break;
		case 14: tween_type = TWEEN.Easing.Quadratic.EaseOut; break;
		case 15: tween_type = TWEEN.Easing.Quadratic.EaseInOut; break;
		case 16: tween_type = TWEEN.Easing.Cubic.EaseIn; break;
		case 17: tween_type = TWEEN.Easing.Cubic.EaseOut; break;
		case 18: tween_type = TWEEN.Easing.Cubic.EaseInOut; break;
		case 19: tween_type = TWEEN.Easing.Quartic.EaseIn; break;
		case 20: tween_type = TWEEN.Easing.Quartic.EaseOut; break;
		case 21: tween_type = TWEEN.Easing.Quartic.EaseInOut; break;
		case 22: tween_type = TWEEN.Easing.Sinusoidal.EaseIn; break;
		case 23: tween_type = TWEEN.Easing.Sinusoidal.EaseOut; break;
		case 24: tween_type = TWEEN.Easing.Sinusoidal.EaseInOut; break;
		case 25: tween_type = TWEEN.Easing.Exponential.EaseIn; break;
		case 26: tween_type = TWEEN.Easing.Exponential.EaseOut; break;
		case 27: tween_type = TWEEN.Easing.Exponential.EaseInOut; break;
		case 28: tween_type = TWEEN.Easing.Bounce.EaseIn; break;
		case 29: tween_type = TWEEN.Easing.Bounce.EaseOut; break;
		case 30: tween_type = TWEEN.Easing.Bounce.EaseInOut; break;
		default: tween_type = TWEEN.Easing.Linear.EaseNone; break;
	}
	new TWEEN.Tween( vec3_from ).to( {
		x: vec3_to.x
	,	y: vec3_to.y
	,	z: vec3_to.z 
	}
	, time ).easing( tween_type ).start();
}

/**
Move the camera
/**/
GLQuery.int_moving_tween_duration = 500;
GLQuery.float_moving_speed = 220;
GLQuery.float_rotation_speed = Math.PI / 32;
GLQuery.vec3_z_south = new THREE.Vector3( 0, 0, 1 );
GLQuery.vec3_y_up = new THREE.Vector3( 0, 1, 0 );
GLQuery.vec3_x_east = new THREE.Vector3( 1, 0, 0 );

GLQuery.fnc_camera_target_rotation = function( int_case, vec3, float_angle_z, float_angle_x )
{
	if ( int_case === 0 )
	if ( float_angle_x <= Math.PI / 2 )
	{
		THREE.Matrix4.rotationYMatrix ( -float_angle_z ).multiplyVector3( vec3 );
	}
	else
	{
		THREE.Matrix4.rotationYMatrix ( float_angle_z ).multiplyVector3( vec3 );
	}
	if ( int_case === 1 )
	if ( float_angle_x <= Math.PI / 2 )
	{
		THREE.Matrix4.rotationYMatrix ( float_angle_z ).multiplyVector3( vec3 );
	}
	else
	{
		THREE.Matrix4.rotationYMatrix ( -float_angle_z ).multiplyVector3( vec3 );
	}
	return this;
}
GLQuery.fnc_camera_target_translation = function( int_case, vec3 )
{
	if ( int_case === 0 )
		THREE.Matrix4.translationMatrix ( -GLQuery.camera.position.x, -GLQuery.camera.position.y, -GLQuery.camera.position.z ).multiplyVector3( vec3 );
	if ( int_case === 1 )
		THREE.Matrix4.translationMatrix ( GLQuery.camera.position.x, GLQuery.camera.position.y, GLQuery.camera.position.z ).multiplyVector3( vec3 );
	return this;

}
GLQuery.fnc_camera_target_translate = function( int_case )
{
	if ( int_case === 0 )
		GLQuery.camera.target.position = THREE.Matrix4.translationMatrix ( -GLQuery.camera.position.x, -GLQuery.camera.position.y, -GLQuery.camera.position.z ).multiplyVector3( GLQuery.camera.target.position );
	if ( int_case === 1 )
		GLQuery.camera.target.position = THREE.Matrix4.translationMatrix ( GLQuery.camera.position.x, GLQuery.camera.position.y, GLQuery.camera.position.z ).multiplyVector3( GLQuery.camera.target.position );
	return this;
}

GLQuery.fnc_camera_rotate_horiz = function( float_factor )
{
	/** Clone the old position */
	vec3_target_position = GLQuery.camera.target.position.clone();
	
	/** Translate it as if the GLQuery.camera were in 0 0 0 */
	GLQuery.fnc_camera_target_translation( 0, vec3_target_position );
	
	/** Rotate it around the Y vector (left to right) to give it an up/down movement */
	THREE.Matrix4.rotationAxisAngleMatrix ( GLQuery.vec3_y_up, Math.PI * float_factor ).multiplyVector3( vec3_target_position );
	/** Rotate it back */
	GLQuery.fnc_camera_target_translation( 1, vec3_target_position );
	
	/** Tween */
	//fnc_tween( GLQuery.camera.target.position, vec3_target_position, 1000 );
	
	
	GLQuery.camera.target.position = vec3_target_position;
	return this;
}
GLQuery.fnc_camera_target_angle_z = function( vec3 )
{
	return Math.acos( vec3.clone().normalize().dot( GLQuery.vec3_z_south.clone().normalize() ) );
}
GLQuery.fnc_camera_target_angle_x = function( vec3 )
{
	return Math.acos( vec3.clone().normalize().dot( GLQuery.vec3_x_east.clone().normalize() ) );
}
GLQuery.fnc_camera_target_angle_y = function( vec3 )
{
	return Math.acos( vec3.clone().normalize().dot( GLQuery.vec3_y_up.clone().normalize() ) );
}
GLQuery.fnc_camera_rotate_vert_old = function( float_amount )
{
	//http://forums.create.msdn.com/forums/p/7234/98796.aspx
	//http://msdn.microsoft.com/en-us/library/bb196388.aspx

	/** Clone the position vector. We will then apply transformations to it */
	var vec3_target_position = GLQuery.camera.target.position.clone();
	/** Get the length */
	//float_length = vec3_target_position.clone().subSelf( GLQuery.camera.position ).length();

	/** Translate it as if the GLQuery.camera were in 0 0 0 */
	GLQuery.fnc_camera_target_translation( 0, vec3_target_position );


	/** Angles with the axes */
	var float_angle_z = Math.floor( GLQuery.fnc_camera_target_angle_z( vec3_target_position ) );
	var float_angle_x = Math.floor( GLQuery.fnc_camera_target_angle_x( vec3_target_position ) );
	//GLQuery.float_angle_y = GLQuery.fnc_camera_target_angle_y();

	/** Rotate it so that it points along the OX axis */
	GLQuery.fnc_camera_target_rotation( 0, vec3_target_position, float_angle_z, float_angle_x );
	
	/** Rotate with respect to the OX axis (up/down) */
	THREE.Matrix4.rotationAxisAngleMatrix ( GLQuery.vec3_x_east, float_amount ).multiplyVector3( vec3_target_position );
	
	/** Rotate it back to the original angle */
	GLQuery.fnc_camera_target_rotation( 1, vec3_target_position, float_angle_z, float_angle_x );
	/** Translate it back in front of the GLQuery.camera */
	GLQuery.fnc_camera_target_translation( 1, vec3_target_position );

	/** Set the length */
	
	
	
	/** Tween */
	//fnc_tween( GLQuery.camera.target.position, vec3_target_position, 1000 );
	GLQuery.camera.target.position = vec3_target_position;
	
}
GLQuery.fnc_camera_rotate_vert_newer = function( float_amount )
{
	var vec3_diff = GLQuery.camera.target.position.clone().subSelf( GLQuery.camera.position );

	/** Translate it as if the GLQuery.camera were in 0 0 0 */
	GLQuery.fnc_camera_target_translation( 0, vec3_diff );

	/** Angles with the axes */
	var float_angle_z = GLQuery.fnc_camera_target_angle_z( vec3_diff );
	var float_angle_x = GLQuery.fnc_camera_target_angle_x( vec3_diff );

	/** Rotate it so that it points along the OX axis */
	GLQuery.fnc_camera_target_rotation( 0, vec3_diff, float_angle_z, float_angle_x );
	
	/** Rotate with respect to the OX axis (up/down) */
	THREE.Matrix4.rotationAxisAngleMatrix ( GLQuery.vec3_x_east, float_amount ).multiplyVector3( vec3_diff );
	
	/** Rotate it back to the original angle */
	GLQuery.fnc_camera_target_rotation( 1, vec3_diff, float_angle_z, float_angle_x );
	/** Translate it back in front of the GLQuery.camera */
	GLQuery.fnc_camera_target_translation( 1, vec3_diff );
	
	/** Tween */
	GLQuery.camera.target.position = GLQuery.camera.position.clone().addSelf( vec3_diff );
	//fnc_tween( GLQuery.camera.target.position, GLQuery.camera.position.clone().addSelf( vec3_diff ), 1000 );
	return this;
	
}
GLQuery.fnc_camera_rotate_vert = function( float_amount )
{
	var vec3_target = GLQuery.camera.target.position.clone();
	/** Get the length */
	//float_length = vec3_target_position.clone().subSelf( GLQuery.camera.position ).length();

	/** Translate it as if the GLQuery.camera were in 0 0 0 */
	GLQuery.fnc_camera_target_translation( 0, vec3_target );


	var vec3_camera = { x : 0, y : 0, z : 0 }
	var vec3_camera0 = GLQuery.camera.position.clone();
	vec3_camera0.x = vec3_camera0.z = 0;
	vec3_camera0.y = 10;
	//vec3_target = GLQuery.camera.target.position.clone();
	
	var vec3_normal = vec3_camera0.subSelf( vec3_camera ).crossSelf( vec3_target.subSelf( vec3_camera ) ).normalize();
	
	THREE.Matrix4.rotationAxisAngleMatrix ( vec3_normal, float_amount ).multiplyVector3( vec3_target );
	GLQuery.fnc_camera_target_translation( 1, vec3_target );
	
	GLQuery.camera.target.position = vec3_target;
	
	return this;
	
}

GLQuery.fnc_translate_z = function( vec3_from, vec3_to, amount )
{
	var vector = vec3_to.clone()
		.subSelf( vec3_from )
		.normalize()
		.multiplyScalar( amount );

	vec3_from.subSelf( vector );
	vec3_to.subSelf( vector );
	return { from : vec3_from, to : vec3_to };
}
GLQuery.fnc_advance = function( vec3_from, vec3_to, float_amount )
{
	/** The destination */
	var obj_res = GLQuery.fnc_translate_z( vec3_from.clone(), vec3_to.clone(), float_amount );
	/** Tweening */
	GLQuery.fnc_tween( vec3_from, obj_res.from, 1000 );
	GLQuery.fnc_tween( vec3_to, obj_res.to, 1000 );
	//OLD: GLQuery.camera.translateZ(-float_moving_speed);
	return this;
}

GLQuery.fnc_camera_translate_z = function( vec3_camera_position, vec3_target_position, amount )
{
	var vector = vec3_target_position.clone()
		.subSelf( vec3_camera_position )
		.normalize()
		.multiplyScalar( amount );

	vec3_camera_position.subSelf( vector );
	vec3_target_position.subSelf( vector );
	return { camera_position : vec3_camera_position, target_position : vec3_target_position };
}
GLQuery.fnc_camera_translate_x = function( vec3_camera_position, vec3_target_position, amount )
{
	var vector = vec3_target_position.clone().subSelf( vec3_camera_position ).normalize().multiplyScalar( amount );
	vector.cross( vector.clone(), GLQuery.vec3_y_up );

	vec3_camera_position.addSelf( vector );
	vec3_target_position.addSelf( vector );
	return { camera_position : vec3_camera_position, target_position : vec3_target_position };
}
GLQuery.fnc_camera_advance = function( float_amount )
{
	/** The destination */
	var obj_res = GLQuery.fnc_camera_translate_z( GLQuery.camera.position.clone(), GLQuery.camera.target.position.clone(), float_amount );
	/** Tweening */
	GLQuery.fnc_tween( GLQuery.camera.position, obj_res.camera_position, 1000 );
	GLQuery.fnc_tween( GLQuery.camera.target.position, obj_res.target_position, 1000 );
	//OLD: GLQuery.camera.translateZ(-float_moving_speed);
	return this;
}
GLQuery.fnc_camera_sidestep = function( float_amount )
{
	/** The destination */
	var obj_res = GLQuery.fnc_camera_translate_x( GLQuery.camera.position.clone(), GLQuery.camera.target.position.clone(), float_amount );
	/** Tweening */
	GLQuery.fnc_tween( GLQuery.camera.position, obj_res.camera_position, 1000 );
	GLQuery.fnc_tween( GLQuery.camera.target.position, obj_res.target_position, 1000 );
	//OLD:camera.translateX(-float_amount);
	return this;
}
GLQuery.fnc_camera_sidestep = function( float_amount )
{
	/** The destination */
	var obj_res = GLQuery.fnc_camera_translate_x( GLQuery.camera.position.clone(), GLQuery.camera.target.position.clone(), float_amount );
	/** Tweening */
	GLQuery.fnc_tween( GLQuery.camera.position, obj_res.camera_position, GLQuery.int_moving_tween_duration );
	GLQuery.fnc_tween( GLQuery.camera.target.position, obj_res.target_position, GLQuery.int_moving_tween_duration );
	//OLD:camera.translateX(float_amount);
	return this;
}
GLQuery.fnc_camera_rise = function( float_amount )
{
	var vec3_camera_position = THREE.Matrix4.translationMatrix ( 0, float_amount, 0 ).multiplyVector3( GLQuery.camera.position.clone() );
	var vec3_target_position = THREE.Matrix4.translationMatrix ( 0, float_amount, 0 ).multiplyVector3( GLQuery.camera.target.position.clone() );
	GLQuery.fnc_tween( GLQuery.camera.position, vec3_camera_position,GLQuery.int_moving_tween_duration );
	GLQuery.fnc_tween( GLQuery.camera.target.position, vec3_target_position,GLQuery.int_moving_tween_duration );
	return this;
}


/**
The main loop
/**/
var halt = null;
window.onfocus = function() { window.halt = false; };
window.onblur = function() { window.halt = true; };
GLQuery.fnc_main_loop = function()
{
	if ( halt === true ) return;
	
	/** Update the animations */
	TWEEN.update();
	
	if ( GLQuery.bool_mouselook === true && GLQuery.bool_mousemoved === true )
	{
		GLQuery.fnc_camera_rotate_horiz( -1 * GLQuery.fnc_mouselook_horiz() * 0.09 * 0.012 );
		GLQuery.fnc_camera_rotate_vert( GLQuery.fnc_mouselook_vert() * 0.16 * 0.012 );
	}
	

	//GLQuery.camera.updateMatrix();

	for( var int_index in GLQuery.renderers )
	{
		var obj = GLQuery.renderers[ int_index ];
		obj.camera.updateMatrix();
		obj.renderer.render( GLQuery.scene, obj.camera );
	}
	
	//GLQuery.renderer.render( GLQuery.scene, GLQuery.camera );
	
	//for ( i in GLQuery.arr_objects ) GLQuery.arr_objects[ i ].projectionMatri

	
	
	for( var index_fnc in GLQuery.arr_functions )
	{
		GLQuery.arr_functions[ index_fnc ].call();
	}

	
	//$3( '#camera' ).translate( $3( '#camera' ), 0.01 );
	//$3( '#camera' ).tween( $3( '#target' ), 1000 );
	//$3( '#camera' ).advance( $3( '#target' ), 5, 1000 );
}







GLQuery.fnc_create_sky = function( width )
{
	var factor = width / 2;
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/skybox/nz.jpg' ), {x:0, y:0, z:-factor*1}, {x:0,y:0,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/skybox/pz.jpg' ), {x:0, y:0, z:factor*1}, {x:0,y:Math.PI,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/skybox/px.jpg' ), {x:-factor*1, y:0, z:0}, {x:0,y:Math.PI/2,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/skybox/nx.jpg' ), {x:factor*1, y:0, z:0}, {x:0,y:-Math.PI/2,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/skybox/ny.jpg' ), {x:0, y:-factor*1, z:0}, {x:-Math.PI/2,y:0,z:Math.PI}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/skybox/py.jpg' ), {x:0, y:factor*1, z:0}, {x:Math.PI/2,y:0,z:Math.PI}, 1, false, true );
	return this;
}
GLQuery.fnc_create_sky2 = function( width )
{
	var factor = width / 2;
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/pisa/nz.png' ), {x:0, y:0, z:-factor*1}, {x:0,y:0,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/pisa/pz.png' ), {x:0, y:0, z:factor*1}, {x:0,y:Math.PI,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/pisa/px.png' ), {x:-factor*1, y:0, z:0}, {x:0,y:Math.PI/2,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/pisa/nx.png' ), {x:factor*1, y:0, z:0}, {x:0,y:-Math.PI/2,z:0}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/pisa/ny.png' ), {x:0, y:-factor*1, z:0}, {x:-Math.PI/2,y:0,z:Math.PI}, 1, false, true );
	GLQuery.fnc_add_object( g_plane = new Plane( factor*2, factor*2, 1, 1 ), GLQuery.fnc_load_texture( '/textures/cube/pisa/py.png' ), {x:0, y:factor*1, z:0}, {x:Math.PI/2,y:0,z:Math.PI}, 1, false, true );
	return this;
}


