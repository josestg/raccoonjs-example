const { Feature } = require("raccoonjs/Feature")
const {makeButton} = require("raccoonjs/helper");
const { ResponseMessage } = require('raccoonjs/ResponseMessage')

class Task extends Feature{
    constructor(owner){
        super(owner)
    }

    start(){
        const keyboard = [[
            makeButton("Left", {
                prefix: this.prefix,
                action: "onLeftClicked",
                params: "1"
            }),
            makeButton("Right", {
                prefix: this.prefix,
                action: "onRightClicked",
                params: "2"
            })
        ]];
        
        return new ResponseMessage("$send", {
            owner: this.owner,
            message: "Hello, World!",
            inline_keyboard: keyboard
        })
    }

    onLeftClicked(params, context){
        console.log(params) // 1
        // edit current message
        const { reply_markup } = context.message
        return new ResponseMessage("$edit", {
            owner: this.owner,
            message: "Halo, Dunia!",
            inline_keyboard : reply_markup.inline_keyboard
        })
    }

    onRightClicked(params, context){
        console.log(params) // 2
        // delete current message and destroy feature session
        return new ResponseMessage("$delete", {
            owner: this.owner,
            destroy: true
        })
    }

}
module.exports = {
    Task
};
