let todoItemsArray = [];
let progressItemsArray =[];
let madeItemArray = [];

let addContent = function (){
    let text = document.getElementById('textarea').value;
    listContent(text);
}


function listContent(text){
    //add item to todo list from textarea
    // const text = document.getElementById('textarea').value;
    const divnode = document.createElement('div');
    const textnode = document.createTextNode(text);
    const listnode  = document.createElement('li');
    const buttonNode = document.createElement('button');
    const buttonNodeToProgress = document.createElement('button');
    buttonNode.innerText = 'Del';
    buttonNodeToProgress.innerText = '=>';
    //div-li-text+button
    listnode.appendChild(textnode);
    listnode.appendChild(buttonNode);
    listnode.appendChild(buttonNodeToProgress);
    divnode.appendChild(listnode);
    document.querySelector('#todo').appendChild(divnode);
    document.getElementById('textarea').value = '';
    //add todo text element to array
    todoItemsArray.push(text);
    console.log(todoItemsArray);
    // document.querySelector('#todo').innerHTML += `<li>{text}</li>` ;

    //delete item in todo list
    buttonNode.addEventListener('click',function(event){
        let index = todoItemsArray.indexOf(text);
        console.log(index);
        todo.Delete(divnode,listnode, todoItemsArray, index);
        document.getElementById('todocolumn').style.background = 'red';
        setTimeout(()=>document.getElementById('todocolumn').style.background='',200);
    });

    //transfer from todo to inprogress and delete from todo
    buttonNodeToProgress.addEventListener('click', function(event){
        let index = todoItemsArray.indexOf(text);
        let textCopy = todoItemsArray[index];
        console.log(textCopy);
        const textNodeProgress = document.createTextNode(textCopy);
        const listNodeProgress = document.createElement('li');
        const buttonNodeToMade = document.createElement('button');
        buttonNodeToMade.innerText = '=>';
        const buttonNodeTodo = document.createElement('button');
        buttonNodeTodo.innerText = '<=';
        const divNodeProgress = document.createElement('div');
        listNodeProgress.appendChild(textNodeProgress);
        listNodeProgress.appendChild(buttonNodeTodo);
        listNodeProgress.appendChild(buttonNodeToMade);
        divNodeProgress.appendChild(listNodeProgress);
        document.querySelector('#inprogress').appendChild(divNodeProgress);

        document.getElementById('todocolumn').style.background = 'yellow';
        setTimeout(()=>document.getElementById('todocolumn').style.background='',200);

        //delete item from todo after transfered to in-progress
        todo.Delete(divnode,listnode, todoItemsArray, index);
        console.log(todoItemsArray);

        //add item to array for progress list
        progressItemsArray.push(textCopy);
        console.log(progressItemsArray);

        //move back to todo list
        buttonNodeTodo.addEventListener('click', function(event){
            // todo.addItemTodo(textCopy);
            todo.Delete(divNodeProgress,listNodeProgress, progressItemsArray, index);
            todoItemsArray.push(textCopy);
            console.log(todoItemsArray);
            console.log(progressItemsArray);
            listContent(textCopy);
            document.getElementById('todocolumn').style.background = 'yellow';
            setTimeout(()=>document.getElementById('todocolumn').style.background='',200);
        });

        //transfer item to madelist from progress list
        buttonNodeToMade.addEventListener('click',function(event){
            let index = progressItemsArray.indexOf(text);
            let textcopy2 = progressItemsArray[index];
            const textNodeMade = document.createTextNode(textcopy2);
            const listNodeMade = document.createElement('li');
            const divNodeMade = document.createElement('div');
            const buttonNodeMade = document.createElement('button');
            buttonNodeMade.innerText = 'del';
            listNodeMade.appendChild(textNodeMade);
            listNodeMade.appendChild(buttonNodeMade);
            divNodeMade.appendChild(listNodeMade);
            document.querySelector('#made').appendChild(divNodeMade);

            //delete item of progress list after transfer to made list
            todo.Delete(divNodeProgress, listNodeProgress, progressItemsArray,index);
            console.log(progressItemsArray);

            //add element to madeItemArray
            madeItemArray.push(textcopy2);
            console.log(madeItemArray);

            document.getElementById('todocolumn').style.background = 'yellow';
            setTimeout(()=>document.getElementById('todocolumn').style.background='',200);

            //delete made list item
            buttonNodeMade.addEventListener('click', function(event){
                todo.Delete(divNodeMade,listNodeMade,madeItemArray,index);
                document.getElementById('todocolumn').style.background = 'red';
                setTimeout(()=>document.getElementById('todocolumn').style.background='',200);
            })
            
        });

        
    });


}

let todo ={

    'Delete': function (parentnode, childnode,arrayname, index){
        parentnode.removeChild(childnode);
        arrayname.splice(index,1);

    },

};


