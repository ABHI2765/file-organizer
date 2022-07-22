const fs = require("fs");

const path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};


// Organize Function will organize all your target folder's files in a different folders acc to their extensions
function organizeFn(dirPath) {
    let destPath;
    if (dirPath == undefined) {
        console.log("Please enter a valid Directory Path");
        return;
    } // check whether directory path is passed or not and if not simply return

    let doesExist = fs.existsSync(dirPath);

    // this doesExist will tell the Target Folder exists or not

    if (doesExist == true) {
        destPath = path.join(dirPath, "organized_Files");

        // we created a path for organized_Files Folder

        // check whether in the given destPath does a folder exist with same name and if does not make a folder
        if (fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath);
        } else {
            console.log("Folder Already Exists");
        }
    } else {
        console.log("Please Enter A valid Path");
    }
    organizeHelper(dirPath, destPath)
}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src)
    // console.log(childNames)

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i])
        let isfile = fs.lstatSync(childAddress).isFile()

        if (isfile == true) {
            let filecategory = getCategory(childNames[i])
            console.log(childNames[i] + ' belongs to ' + filecategory)
            sendFiles(childAddress, dest, filecategory)
        }
    }
}

function getCategory(fileName) {
    let ext = path.extname(fileName).slice(1)
    // we extraxted extension names of the target files
    //console.log(ext)

    for (let key in types) {
        let ctypeArr = types[key]
        // we took out all the category types arrays here

        for (let i = 0; i < ctypeArr.length; i++) {
            if (ext == ctypeArr[i]) {
                return key
            }
        }
    }
    return 'others'
}

function sendFiles(srcFilePath, dest, fileCategory) {
    // we will create path for each category type encountered to create folders of their names
    let catPath = path.join(dest, fileCategory)

    //D:\FJP4\test folder\organized_files\media
    //D:\FJP4 \test folder\organized_files\documents


    if (fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath)
    }


    let fileName = path.basename(srcFilePath)

    // we took out the basename of all the files

    let destFilePath = path.join(catPath, fileName)


    fs.copyFileSync(srcFilePath, destFilePath)

    fs.unlinkSync(srcFilePath)


    console.log('Files Organized')




}


module.exports = {
    organizeFnKey: organizeFn
}