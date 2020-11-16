class ObjectQuery {
    // Create a new object that can handle queries
    constructor(object) {
        this.object = object;
        this.prevRes;
    }

    // NoSQL
    get() {
        return this;
    }

    first() {
        const objArray = Object.entries(this.object)
        return Array(objArray[0])
    }
    /**
     * 
     * @return {Array} index 
     */
    atIndex(index) {
        const objIndex = Object.keys(this.object)
        return {
            label: objIndex[index],
            data: this.object[objIndex[index]]
        }
    }

    data() {

    }

    // static methods
    static get(object) {

    }

    // SQL queries
    raw(query) {
        /**
         * -------------------
         * | data |
         * +------+
         * | Array({...})\
         */

        const keywords = [
            'SELECT',
            'FROM'
        ]
        // Transpile query to cool stuffz
        query = query.split(' ')
        let stack = []
        
        query.forEach((word) => {
            switch (true) {
                // keyword
                case keywords.includes(word):
                    stack.push(`${keywords[keywords.indexOf(word)]}`)
                    break;
                // Text/* sign
                case (!keywords.includes(word)):
                    // not a keyword and not a unary
                    if(word !== '*') {
                        stack.push(`${word}`)
                    }
                    else {
                        stack.push(`*`)
                    }

                    break;
                default:
                    break;
            }
        })
        var result;
        // get rows from object
        stack.forEach((action, index) => {
            switch (true) {
                case action === 'SELECT':
                    // check amount
                    const amount = stack[index+1]
                    if(amount == '*') {
                        // Validate FROM
                        if(stack[index+2] == 'FROM') {
                            // next, get object part
                            if(stack[index+3]) {
                                result = this.object[stack[index+3].replace(/\`/g, '')]
                                if(result) {}
                                else { throw new Error(`Couldn't find results on table ${stack[index+3]}.`) }
                            }
                        }
                    }
                    break;
            
                default:
                    break;
            }
        })

        return result
    }
}

const objQue = new ObjectQuery(
    {
        data: [
            {name: 'Adam'},
            {name: 'Eve'}
        ],
        label: 'Cool stuff'
    }
)

console.log(objQue.raw('SELECT * FROM `data`'))