

$(document).ready(function() {


    //////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    function generate(tuning,number_frets,root_note,scale,mode){
    
        number_frets=parseInt(number_frets)+1;
    
        var intervals=['1','2b','2','3b','3','4','5b','5','6b','6','7b','7']; 
        var notes=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
                        
        scale=scale.split(',');
        tuning=tuning.split(',').reverse();
        
        tuning.forEach(function (item, index) {
          $(".fretboard").append("<div class='string' id='string"+index+"'>");
        
            //console.log(".string "+index);
            $("#string"+index).append("<div class='vo'></div>");
            $("#string"+index).append("<div class='vl'></div>");
            $("#string"+index).append("<div class='nut'><div class='note string_tune'><input type='text'value="+item+"></input></div></div>");
        
        for(var o=0;o<number_frets;o++){
            $("#string"+index).append("<div class='fret'><div class='note'><input type='text'value=></input></div></div>");
        }
        
          $(".fretboard").append("</div>");
        });
        
        
        $(".fretboard").append("<div class='string' id='scale_frets'>");
        $("#scale_frets").append("<div class='vo blank'></div>");
        $("#scale_frets").append("<div class='vl blank'></div>");
        $("#scale_frets").append("<div class='nut blank'><div class='fret_scale'><input type='text'value=></input></div></div>");
        
        for(var o=0;o<number_frets;o++){
        $("#scale_frets").append("<div class='fret border0'><div class='fret_scale' ><input type='text'value='"+(o)+"'></input></div></div>");
        }
        
        $(".fretboard").append("</div>");
        
        //OBTENER NOTA INICIO        
        $( ".string" ).each(function( index ) {
    
        var string_note='';
        var frets='';
        
        string_note=$(this).find(".nut .note input[type=text]").val();
        frets=$(this).find(".fret .note input[type=text]")
        
        var sc=[...intervals];
    
        var string_shift=notes.indexOf(string_note);
        var root_shift=notes.indexOf(root_note);
        
       // console.log(sc);
        /////////////////
        for(var i=0;i<string_shift;i++){    
            sc.push(sc[0]);
            sc.shift();
        }
        
        for(var i=0;i<(12-root_shift);i++){
            sc.push(sc[0]);
            sc.shift();
        }
        
        sc.forEach(function (item, index) {
           if( scale.indexOf(item)==-1)
           sc[index]='-';
        });
        ///
          
        frets.each(function( index ) {
            //console.log(sc[index%sc.length]);
           // var offset=notes.indexOf(string_note);
        
        if(sc[index%sc.length]!='-')
        $(this).val(sc[((index)%sc.length)]);
        
        if(sc[index%sc.length]=='-') {
        $(this).val("");
        $(this).parent('.note').css( "background", "white" );
        $(this).parent('.note').css( "border", "1px solid grey" );
        $(this).parent('.note').css( "opacity", "50%" );
        }
        
        
        });
        
    ////intervals to notes 
    if(mode=='notes'){
        frets.each(function( index ) { 
        $(this).val(notes[(intervals.indexOf($(this).val()))%intervals.length]);  
        });
    }


    if(mode=='chromatic'){
        frets.each(function( index ) { 
       // console.log('index: '+index+" string-shift: "+string_shift+" root shift: "+root_shift+" res:  "+(index+string_shift-root_shift));  
           
            if((index+string_shift-root_shift)<0)
            $(this).val(12+(index+string_shift-root_shift));  
            else
        $(this).val( (index+string_shift-root_shift));  
        });
    }
    
    });
    }


    
    /////////////////////////////////////////////////////////  
        
        
    $(document).on('change keyup paste', '.params', function() {
        
            var tuning=($("#tuning").val());
            var scale=($("#scale").val());
            var root_note=($("#root_note").val());
            var number_frets=($("#number_frets").val());
            var mode=($("#mode").val());
        
            console.log(tuning+" "+scale+" "+root_note+" "+number_frets+" "+mode);
            
        if($("#tuning").val()!='' && $("#scale").val()!='' && $("#root_note").val()!='' && $("#number_frets").val()!=''){
        $(".fretboard").empty();
        generate(tuning,number_frets,root_note,scale,mode);
        }
        
    });
        
    generate('E,A,D,G,B,E',12,'E','1,2,3,4,5,6,7','intervals');
    
    });
    
    
    