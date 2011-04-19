

GLQuery.determine_intersect = function( event )
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
	GLQuery.add_object_wireframe( this.obj.geometry, this.obj.position, this.obj.rotation, this.obj.scale );
	
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



GLQuery.get_factor = function( factor )
{
	if ( factor === undefined ) return 1;
	return factor;
};
GLQuery.orbit_horiz = function( target, factor )
{
	factor = GLQuery.get_factor( factor );
	$3('#camera').orbit( target, factor * GLQuery.float_rotation_speed );
	$3('#target').orbit( target, factor * GLQuery.float_rotation_speed );
}
GLQuery.orbit_vert = function( target, factor )
{
	factor = GLQuery.get_factor( factor );
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
GLQuery.prototype.getName = function()
{
	return this.name;
};
GLQuery.prototype.setName = function( str )
{
	this.name = str;
	return this;
};

GLQuery.prototype.setPositionVector = function( vec3 )
{
	this.obj.position = vec3;
	this.obj.updateMatrix();
	return this;
};
GLQuery.prototype.setRotationVector = function( vec3 )
{
	this.obj.rotation = vec3;
	this.obj.updateMatrix();
	return this;
};
GLQuery.prototype.setScaleVector = function( vec3 )
{
	this.obj.scale = vec3;
	this.obj.updateMatrix();
	return this;
};
GLQuery.prototype.getPosition = function()
{
	return this.obj.position;
};
GLQuery.prototype.getMesh = function()
{
	return this.obj;
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
	if ( y === undefined ) return this.setRotationVector( x );
	
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
	if ( y === undefined ) return this.setPositionVector( x );
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
	if ( y === undefined ) return this.setScaleVector( x );
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
	
	GLQuery.tween( this.obj.position, vec3_to, float_time, 14 );
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
	//echo( 'Setting texture {0} to {1}', str_url_texture, this.name );
	this.obj.materials[ 0 ] = new THREE.MeshBasicMaterial( { map : ImageUtils.loadTexture( str_url_texture ) } );
	this.obj.updateMatrix();
	return this;
};
GLQuery.loadStatic = function( obj )
{
	var material = GLQuery.load_texture( obj.texture );
	material = new THREE.MeshBasicMaterial( { map : ImageUtils.loadTexture( obj.texture ) } );
	
	
	
	var mesh = new THREE.Mesh( obj.geometry, material );
	
	//If it should auto-update the matrix
	mesh.autoUpdateMatrix = obj.autoUpdate;
	//If it should be selectable or not. false = selectable
	mesh.static = obj.static;
	
	if ( ! isNaN( obj.scale ) ) obj.scale = { x: obj.scale, y: obj.scale, z: obj.scale };
	
	var $3_obj = GLQuery.add( obj.name, mesh ).addClass( obj.class );
	$3_obj.setRotationVector( obj.rotation );
	$3_obj.setScaleVector( obj.scale );
	$3_obj.setPositionVector( obj.position );
	
	GLQuery.scene.addObject( mesh );
	//GLQuery.arr_objects.push( new GLQuery( '', mesh ) );
	
	return $3_obj;
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
			$3_obj.obj = GLQuery.obj_from_str( str_data, str_url_texture, str_url_obj );
			
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
GLQuery.obj_from_str = function( str_obj, str_url_texture, str_url_obj )
{
	var int_area = 1;
	var int_offset =  GLQuery.arr_objects.length;
	
	var obj_position = { x : 25, y : 25, z : 25 };
	var obj_rotation = { x:0, y:0, z:0 };
	var int_scale = 1;

	
	var material = GLQuery.load_texture( str_url_texture );
	
	
	//var material = new THREE.MeshBasicMaterial( { env_map: ImageUtils.loadTexture( str_url_texture, new THREE.SphericalReflectionMapping() ) } );
	//var material =  new THREE.MeshBasicMaterial( { map : ImageUtils.loadTexture( str_url_texture ) } );
	//var material = GLQuery.get_special_material( str_url_texture );

	var geometry = new Obj_from_str( str_obj );
	
	var mesh = GLQuery.add_object( geometry, material, obj_position, obj_rotation, int_scale, true );
	mesh.texture = str_url_texture;
	mesh.url = str_url_obj;
	return mesh;
};
GLQuery.prototype.clone = function()
{
	var obj_position = { x : this.obj.position.x, y : this.obj.position.y, z : this.obj.position.z };
	var obj_rotation = { x : this.obj.rotation.x, y : this.obj.rotation.y, z : this.obj.rotation.z };
	var obj_scale = { x : this.obj.scale.x, y : this.obj.scale.y, z : this.obj.scale.z };

	var geometry = new Obj_from_geom( this.obj.geometry );

	var material = GLQuery.load_texture( this.obj.texture );

	//echo( 'Cloning {0}', this.name );
	//echo( 'Applying texture {0}', this.obj.texture );
	
	var mesh = GLQuery.add_object( geometry, material, obj_position, obj_rotation, obj_scale, true );
	mesh.texture = this.obj.texture;
	mesh.url = this.obj.url;
	
	return GLQuery.add( this.name + time(), mesh ).setTexture( this.obj.texture );
	
};