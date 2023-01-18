const fs = require('fs')

let returnText = `
    return (\n
        <div>\n`;
let lastText =`
        </div>  
    );
}
`;
function CreateText (json){
    let defautlText =`
    import React, {useState,useEffect} from 'react';

    export default function ${json[0].fileName.replace(/[^A-Z0-9]/ig, "")}() {
    
    `;
    let headertext = `      <h1>${json[0].fileName}</h1>`;
    let fieldText = '';
    let stateText = '';
    json.map((e) => {
        stateText += `       const [${e.fileName.replace(/[^A-Z0-9]/ig, "")}, set${e.fileName.replace(/[^A-Z0-9]/ig, "")}] = useState("")\n`;
        fieldText +=  `\n       <input type='${e.type.toLowerCase()}' value={${e.fileName.replace(/[^A-Z0-9]/ig, "")}} onChange={(e) => set${e.fileName.replace(/[^A-Z0-9]/ig, "")}(e.target.value)} placeholder="Enter the ${e.fieldName}" />\n`;
    });

    return defautlText + stateText + returnText + fieldText + lastText;
}


exports.Text = async (req,res) => {
    const folderName = './react';
    try {
        fs.rmdir(folderName, () => {});
        fs.mkdir(folderName,() => {});
        fs.writeFile((folderName + `/${req.body[0].fileName}.js`), CreateText(req.body), err => {
            if(err)
                res.send(err);
            else
                res.send({"result":"File Created Successfully"});
        })
    } catch (error) {
        
    }
}