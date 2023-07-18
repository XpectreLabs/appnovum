import React, { useState } from 'react';
import { Button, message, Steps} from 'antd';
import { Registro1 } from './Registro1.tsx';
import { Registro2 } from './Registro2.tsx';
import { Registro3 } from './Registro3.tsx';

export const Registro = () => {
    const [current, setCurrent] = useState(0);
    const [paso1, setPaso1] = useState('process');
    const [paso2, setPaso2] = useState('wait');

    const onChange = (value: number) => {
      console.log('onChange:', value);
      setCurrent(value);
    };

    const steps = [
      {
        title: 'First',
        content: <Registro1 />,
      },
      {
        title: 'Second',
        content: <Registro2 />,
      },
      {
        title: 'Last',
        content: <Registro3 />,
      },
    ];

    const next = () => {
      if(current===0)
        setPaso1('finish');
      else if(current===1)
        setPaso2('finish');

      setCurrent(current + 1);
    };

    const prev = () => {
      setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
            <>
              <Steps
                type="navigation"
                size="small"
                current={current}
                // onChange={onChange}
                className="site-navigation-steps"
                items={[
                  {
                    title: 'Usuario',
                    subTitle: '',
                    status: `${paso1}`,
                    description: '',
                  },
                  {
                    title: 'Empresa',
                    subTitle: '',
                    status: `${paso2}`,
                    description: '',
                  },
                  {
                    title: 'Seguridad',
                    subTitle: '',
                    status: 'wait',
                    description: '',
                  },
                ]}
              />

              <Steps current={current} items={items} />
              <div >{steps[current].content}</div>
              <div className='u-floatRight'>
                {current < steps.length - 1 && (
                  <Button id="BtnSiguiente" type="primary" onClick={() => next()}>
                    Siguiente
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button id="BtnTerminar" type="primary" onClick={() => message.success('Processing complete!')}>
                    Terminar registro
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
              </div>
            </>
          );
      }