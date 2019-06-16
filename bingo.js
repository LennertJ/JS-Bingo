/*TO DO
Functional additions
	-add win checker
beauty additions
	-add winning sound
*/

//{ variables
const colorUnchecked = "black";
const colorChecked = "white";
const bgColorUnchecked = "white";
const bgColorChecked = "black";

//all colls or rows over 10 will be ignored
const ROWS = 4;
const COLS = 4;

window.onload = setup();
//}

//{setup
function setup()
{
	addTable();
	
	var counter = 0; 
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLS; j++){
			document.getElementById("edit" + i + j).addEventListener("click", NewWord, false);	
			document.getElementById("check" + i + j).addEventListener("click", CheckField, false);
			
			document.getElementById('field' + i + j ).onmouseover = function() {
				var objDiv = document.getElementById(this.id);
				objDiv.scrollTop = objDiv.scrollHeight;
			}
			
			document.getElementById('field' + i + j ).onmouseleave = async function() {
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
  var gameTable = document.getElementById("gameTable");

  var table = document.createElement('table');

  var tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  for (var i = 0; i < ROWS; i++) {
    var tr = document.createElement('tr');
    tableBody.appendChild(tr);
    for (var j = 0; j < COLS; j++) {
      var td = document.createElement('td');
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
  gameTable.appendChild(table);
}

//}

//{basic bingo
function NewWord()
{
	if(temp.length > "edit00".length){return;}
	var temp = this.id;
	var ID = temp.substr(temp.length - 2)
	var result = "word" + ID;
	var word = prompt("Word for bingo: (field" + ID + ")", document.querySelector('#' + result).innerHTML);
	
	document.querySelector('#'+ result).innerHTML = word
	//document.getElementById(result).innerHTML = word;
}

function CheckField()
{
	var temp = this.id;
	if(temp.length > "check00".length){return;}
	
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
//}

//{file upload
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
	document.getElementById("fileInfo").innerHTML = file.name + " " + file.size + " bytes ( "+ file.type + " last modified " + file.lastModifiedDate + " )"; // show unnesecairy fileinfo 

	var reader = new FileReader();

	reader.onload = function(progressEvent)
	{
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
//}