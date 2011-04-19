// http://www.html5rocks.com/tutorials/file/dndfiles/
GLQuery.handleFileSelect = function( evt ) 
{
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files; // FileList object.
	// files is a FileList of File objects. List some properties.
	var output = [];
	for ( var i = 0, f; f = files[ i ]; i++ )
	{
		output.push( '<li><strong>', f.name, '</strong> ( ', f.type || 'n/a', ' ) - ', f.size, ' bytes</li>' );
		var reader = new FileReader();
		// Closure to capture the file information.
		with ( { f : f } )
		{
		reader.onload = (
		function( e )
		{
	
			
			var mesh = GLQuery.add_object_from_str( ( e.target.result + '' ) );
			GLQuery.add( f.name + time(), mesh );
			
		} );
		// Read in the image file as a data URL.
		reader.readAsBinaryString( f );
		}
	}
	//document.getElementById( 'list' ).innerHTML = '<ul>' + output.join( '' ) + '</ul>';
}
GLQuery.handleDragOver = function( evt ) 
{
	evt.stopPropagation();
	evt.preventDefault();
}
GLQuery.create_drop_point = function( elem )
{
	elem.addEventListener( 'dragover', GLQuery.handleDragOver, false );
	elem.addEventListener( 'drop', GLQuery.handleFileSelect, false );
}