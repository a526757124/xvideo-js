let lis = require('./listen.js')
let keypress = require('keypress')
const readline = require('readline');

module.exports = function(){
    process.stdout.write('\033c')
    const inquirer = require('inquirer');
    inquirer.prompt([{
    	type:'list',
    	name:'choice',
    	message:'What do you want?',
    	choices:[
    		{name:'Watch the home page',value:'home'},
    		{name:'Input your keyword to find',value:'keyword'},
    		{name:'Favorite',value:'favorite'},
    			new inquirer.Separator(),
    		{name:'Exit',value:'exit'}]
    }]).then(function(answer){
    	switch(answer.choice){
    		case "home":
                process.stdin.on('keypress',lis.hchoose);
                lis.homes.renderTen();
                //function main page listener
                break;
    		case "keyword":
                if(lis.keywords.keyword!=''){
                    process.stdin.on('keypress',lis.kchoose);
                    lis.keywords.renderTen();
                }
                else{
                    process.stdin.removeAllListeners();
                    process.stdin.setRawMode(false);

                    let rl = readline.createInterface({
                      input: process.stdin,
                      output: process.stdout
                    });
                    console.log('Give me keyword: ')
                    rl.on('line',answer=>{
                        lis.keywords.keyword = answer;
                        rl.close();
                    })
                    rl.on('close',function(){
                        if(lis.keywords.keyword==''){
                            console.reset();
                            console.log('keyword empty');
                            process.exit();
                        }
                        keypress(process.stdin);
                        process.stdin.setRawMode(true);
                        process.stdin.resume();
                        process.stdin.on('keypress',(ch,key)=>{
                            if(key && key.ctrl &&key.name=='c'){
                                console.reset();
                                process.stdin.pause();
                            }
                        })
                        process.stdin.on('keypress',lis.kchoose);

                        lis.keywords.renderTen();
                    })
                }
                break;
    		case "favorite":
                process.stdin.on('keypress',lis.fchoose);
                lis.fpages.renderTen();
                break;
    		case "exit":
    			process.exit();
    			break;
    		default:
    			break;
    	}
    })
}
