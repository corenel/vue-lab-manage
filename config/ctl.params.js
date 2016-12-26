 let ctlParams = {
     coupleTank: {
         'PI+FF': {
             name: 'PI+FF',
             params: {
                 mdl: {
                     name: 'Model',
                     value: 'sim_tank_2_PI'
                 },
                 StopTime: {
                     name: 'Stop time',
                     value: '30'
                 },
                 L10: {
                     name: 'Tank 1 level setpoint',
                     value: '15'
                 },
                 L20: {
                     name: 'Tank 2 level setpoint',
                     value: '15'
                 },
                 Kp_1: {
                     name: 'Kp_1',
                     value: '7.2152'
                 },
                 Ki_1: {
                     name: 'Ki_1',
                     value: '9.1061'
                 },
                 Kff_1: {
                     name: 'Kff_1',
                     value: '2.3911'
                 },
                 Kp_2: {
                     name: 'Kp_2',
                     value: '5.0934'
                 },
                 Ki_2: {
                     name: 'Ki_2',
                     value: '1.7436'
                 },
                 Kff_2: {
                     name: 'Kff_2',
                     value: '1'
                 }
             }
         },
         Smith: {
             name: 'Smith',
             params: {
                 mdl: {
                     name: 'Model',
                     value: 'sim_tank_2_Smith'
                 },
                 StopTime: {
                     name: 'Stop time',
                     value: '30'
                 },
                 L10: {
                     name: 'Tank 1 level setpoint',
                     value: '15'
                 },
                 L20: {
                     name: 'Tank 2 level setpoint',
                     value: '15'
                 },
                 Kp_1: {
                     name: 'Kp_1',
                     value: '7.2152'
                 },
                 Ki_1: {
                     name: 'Ki_1',
                     value: '9.1061'
                 },
                 Kff_1: {
                     name: 'Kff_1',
                     value: '2.3911'
                 },
                 Kp_2: {
                     name: 'Kp_2',
                     value: '5.0934'
                 },
                 Ki_2: {
                     name: 'Ki_2',
                     value: '1.7436'
                 },
                 Kff_2: {
                     name: 'Kff_2',
                     value: '1'
                 }
             }
         },
         nnmpc: {
             name: 'nnmpc',
             params: {
                 mdl: {
                     name: 'Model',
                     value: 'sim_tank_2_nnmpc'
                 },
                 StopTime: {
                     name: 'Stop time',
                     value: '30'
                 },
                 L10: {
                     name: 'Tank 1 level setpoint',
                     value: '15'
                 },
                 L20: {
                     name: 'Tank 2 level setpoint',
                     value: '15'
                 }
             }
         }
     }
 }
 export {ctlParams}

