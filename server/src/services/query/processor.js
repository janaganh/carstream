const flatten  = require('flat');
const jobs = [];

class Processor {

    constructor(service) {
        this.service = service;
        
    }
    
    parse(query) {
        try {
            //query = 'select speed from Diagnostics poll 5';
            let queryParts = query.trim().toLowerCase().split(/from/);
            let part1 = queryParts[0].trim().split(/\s+/);
            
            part1.shift();
            part1 = part1.join();
            
            let attributes = part1.split(',').filter( e => e.trim() != '' );           
            let part2 = queryParts[1].trim().split(/\s+/);
            let capability = part2[0];
            
            part2.shift();
            let times = part2;
            
            return {attributes, capability, times};
            
        }catch(err) {
            throw err;
        }
        
        throw "Query parsing failed";
    }
    
    get connection () {
        if (!this._connection) {
            let hmkitConnection = this.service.app.get('hmkit');
            this._connection = hmkitConnection;
        }
        return this._connection;     
    }
    
    
    process(query) {
        let queryProperties = this.parse(query);
        return QueryRunner.run(this, queryProperties);    
    }
    
    stopRunningQueries(){
        QueryRunner.clearJobs();
    }
    
}


class QueryRunner {
     
    static run(processor, queryProperties)  {
       let connection = processor.connection;
       let runnable = QueryRunner._getRunnableObject(connection, queryProperties);
       
       if (queryProperties.times.length == 2 ) {
            let job = setInterval(() => {
                let response = runnable();
                processor.service.emit('data', response);        
            }, queryProperties.times[1]*1000);
            jobs.push(job);
           
       }
        return runnable();  
    }

    static _getRunnableObject(connection, queryProperties) {
        return () => {
            let command =  CommandFactory.getCommand(queryProperties.capability);
            return command.exec(connection, queryProperties);
        }
    }
    
    static clearJobs() {
        jobs.forEach(job => clearInterval(job));
        while(jobs.length > 0) {
            jobs.pop();
        }
    }
   
}

class AbstractCommand {
    
    async exec(connection, queryProperties) {
        let  response = await connection.hmkit.telematics.sendCommand(
                                    connection.vehicalSerial, 
                                    this.getCommand(connection)
                        );
        return this.getResult(response, queryProperties.attributes);

    }
     
    getCommand(connection) {
          throw 'Not implemented';
    }
  
    getResult(response, attributes) {
        let tmp = {};
        let result = { timestamp: Date.now()};
        let responseParsed = response.parse();
      
        responseParsed = flatten(responseParsed);
        let keys = Object.keys(responseParsed);
        
        keys.forEach(key => tmp[key.toLowerCase()] = responseParsed[key]);
        for(let i = 0; i < attributes.length; i++) {
            result[attributes[i]] = tmp[attributes[i]];
        }
        return result;
    }    
      
}

class Diagnostics extends AbstractCommand {
    
    getCommand(connection) {
        return connection.hmkit.commands.DiagnosticsCommand.getState();
    }
   
}


const COMMANDS = {
    'diagnostics': new Diagnostics()
};


class CommandFactory {
    static getCommand(capability) {
        return COMMANDS[capability];
    }

}



module.exports = function (service) {
  return new Processor(service);
};

module.exports.Processor = Processor; 