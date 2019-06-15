/*TO DO
Functional additions
	-add win checker
beauty additions
	-add winning sound
*/

var Id;
var Word;
var colorUnchecked = "black";
var colorChecked = "white";
var bgColorUnchecked = "white";
var bgColorChecked = "black";
const ROWS = 4;
const COLS = 4;

window.onload = setup();

function setup()
{
	addTable();
	
	//eventlistners
	var editbtnArray = [];
	var checkbtnArray = [];
	var hoverArray = [];
	var counter = 0; 
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLS; j++){
			editbtnArray.push(document.getElementById("edit" + i + j));
			checkbtnArray.push(document.getElementById("check" + i + j));
			hoverArray.push(document.getElementById("field" + i + j));
			
			editbtnArray[counter].addEventListener("click", NewWord, false);	
			checkbtnArray[counter].addEventListener("click", CheckField, false);
			
			document.getElementById('field' + i + j ).onmouseover = function() {
				var objDiv = document.getElementById(this.id);
				objDiv.scrollTop = objDiv.scrollHeight;
			}
			

			document.getElementById('field' + i + j ).onmouseleave = function() {
				var myDiv = document.getElementById(this.id);
				myDiv.scrollTo(0, 0);
			}
			counter++;
		}
	}
	// upload
	
	var txt = document.getElementById('premade');
	txt.addEventListener('drop', DropFile, false);
	txt.addEventListener('dragover', DragFile, false);

}

function addTable() {
  var myTableDiv = document.getElementById("gameTable");

  var table = document.createElement('TABLE');

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0; i < ROWS; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (var j = 0; j < COLS; j++) {
      var td = document.createElement('TD');
      //td.appendChild(document.createTextNode("Cell " + i + "," + j));
	  td.setAttribute('id', 'field' + i + j);
	  
	  var word = document.createElement('div');
	  word.setAttribute('id','word' + i + j );
	  
	  var edit = document.createElement('button');
	  edit.appendChild(document.createTextNode('edit'));
	  edit.setAttribute('id', 'edit' + i + j);
	  
	  var check = document.createElement('button');
	  check.setAttribute('id', 'check' + i + j);
	  check.appendChild(document.createTextNode('check'));

	  td.appendChild(word);
	  td.appendChild(document.createElement('br'));
	  td.appendChild(edit);
	  td.appendChild(check);
	  
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
}

function NewWord()
{
	var temp = this.id;
	var ID = temp.substr(temp.length - 2)
	var result = "word" + ID;
	var word = prompt("Word for bingo: (field" + ID + ")", document.getElementById(result).innerHTML);
	document.getElementById(result).innerHTML = word;
}

function CheckField()
{
	var temp = this.id;
	var ID = temp.substr(temp.length - 2)
	
	var result = "field" + ID;
	var edit = "edit" + ID;
	var check = "check" + ID;

	
	if (document.getElementById(check).innerHTML == "check")
	{
		document.getElementById(result).style.color = colorChecked ;
		document.getElementById(result).style.backgroundColor= bgColorChecked;
		document.getElementById(edit).style.color = colorChecked ;
		document.getElementById(edit).style.backgroundColor= bgColorChecked;
		document.getElementById(check).style.color = colorChecked ;
		document.getElementById(check).style.backgroundColor= bgColorChecked;
		document.getElementById(check).innerHTML = "uncheck";
	}
	else
	{
		document.getElementById(result).style.color = colorUnchecked;
		document.getElementById(result).style.backgroundColor=  bgColorUnchecked ;
		document.getElementById(edit).style.color = colorUnchecked;
		document.getElementById(edit).style.backgroundColor= bgColorUnchecked ;
		document.getElementById(check).style.color = colorUnchecked;
		document.getElementById(check).style.backgroundColor =  bgColorUnchecked;
		document.getElementById(check).innerHTML = "check";
	}
}

function DragFile(evt)
{
	evt.preventDefault();
}

function DropFile(evt)
{
	//js magic (stops opening of file)
    evt.preventDefault();
	
	var files = evt.dataTransfer.files; // get all files (not sure how to block multiple files)
	var file = files[0];// take first file from list
	document.getElementById("fileInfo").innerHTML = file.name + " " + file.size + " bytes ( "+ file.type + " last modified " + file.lastModifiedDate + " )"; // show unnesecairy info just because

	var reader = new FileReader();// some strange js function to read files
	
	//internet copy pasta magic
	reader.onload = function(progressEvent)
	{
		//here my programming starts again
	var lines = this.result.split('\n');
		for(var line = 0; line < lines.length; line++)
		{
			if(line == ROWS * COLS){ break;}// dont overwork on too long files
			else
			{
				var Id = "" + Math.floor(line / ROWS) + line % COLS// make a custom id
				LoadWord(Id, lines[line]);
			}

		}
	};
	reader.readAsText(file);
}

function LoadWord(Id, Word)
{
	var result = "word" + Id;
	document.getElementById(result).innerHTML = Word;
}