jQuery(function($) {
 
	var methods = {

		selectOption: function(){

			return this.each(function(){

				var $this = $(this);
				var data = $this.data('mySelectbox');

				var selected = data.clicked;

				$this.val(selected.attr('data-value'));
				data.current.html(selected[0].innerHTML);

			});

		},

		fakeSelect: function(){

			return this.each(function(){

				var $this = $(this);
				var data = $this.data('mySelectbox');

				data.container = $('<div></div>');

				$this.after(data.container);

				data.current = $('<div></div>');
				data.listOptions = $('<ul></ul>');

				data.container.append(data.current);
				data.container.append(data.listOptions);  


				for (var i = 0; i < data.options.length; i++) {
					
					var el = '<li data-value="'+ data.options[i].value +'">'+ data.options[i].text +'</li>';

					data.listOptions.append(el);

					// choose first as selected option

					if(i === 0){

						$this.val(data.options[i].value);
						data.current.html(data.options[i].text);

					}


				};

				data.listOptions.on('click', 'li', function(){

					data.clicked = $(this);

					$this.mySelectbox('selectOption');

				});

			});

		},

		setOptions: function(){

			return this.each(function(){

				var $this = $(this);
				var data = $this.data('mySelectbox');

				data.target.children().each(function(){

					var obj = {

						'value' : $(this)[0].value,
						'text' : $(this)[0].innerHTML

					}

					data.options.push(obj);

				});

				$this.mySelectbox('fakeSelect');

			});

		},

		init: function(){

			return this.each(function(){

				var $this = $(this);
				var data = $this.data('mySelectbox');

				$this.css('display', 'none');

				if(!data){

					$(this).data('mySelectbox', {

						target : $this,
						options : [] 

					});

					$this.mySelectbox('setOptions');

				}


			});

		}
		
	};

	$.fn.mySelectbox = function( method ) {

	
		if ( methods[method] ) {

			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));

		} else if ( typeof method === 'object' || ! method ) {

			return methods.init.apply( this, arguments );

		} else {

			$.error( 'Method ' + method + ' does not exist on jQuery.myDamnCheckbox' );

		}
	};

});