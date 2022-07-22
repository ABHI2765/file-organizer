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

function treeFn(dirPath) {

    if (dirPath == undefined) {
        console.log("Please enter a valid Path");
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);

        if (doesExist == true) {
            treeHelper(dirPath, "  ")
        }

    }

}

function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile()


    if (isFile == true) {
        let fileName = path.basename(targetPath)
        console.log(indent + "├──" + fileName)
    }
    else {
        let dirName = path.basename(targetPath)
        console.log(indent + "└──" + dirName)

        let children = fs.readdirSync(targetPath)

        for (let i = 0; i < children.length; i++) {
            let childpath = path.join(targetPath, children[i])
            treeHelper(childpath, indent + '\t')
        }

    }

}

module.exports = {
    treeFnKey: treeFn
}