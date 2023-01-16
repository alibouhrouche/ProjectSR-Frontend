import { Button, Col, InputNumber, Modal, Row, Slider, useModal } from "@pankod/refine-antd"
import { BaseRecord, useNotification, useUpdate } from "@pankod/refine-core"
import { PropsWithoutRef, useState } from "react"

export const BUY = Symbol('BUY_TICKET')

const IntegerStep = ({min,max,onChange: change}:PropsWithoutRef<{
    min:number,
    max:number,
    onChange:(newValue: number)=>void
}>) => {
    const [inputValue, setInputValue] = useState(1);
  
    const onChange = (newValue: number|null) => {
      setInputValue(newValue!);
      change(newValue!)
    };
  
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={min}
            max={max}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={min}
            max={max}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    );
  };

function Buy({value,record,hideText=false}:PropsWithoutRef<{value:string,record:BaseRecord,hideText?:boolean}>) {  
  const { mutateAsync } = useUpdate();
  const {show,close,modalProps} = useModal();
  const [val, setVal] = useState(1)
  const {open} = useNotification()
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        gap: "2rem"
    }}>
        {hideText || value}
        <Button onClick={show} disabled={record.nombreEntrees === 0}>
            Buy
        </Button>
        <Modal {...modalProps} title="Buy Tickets"
            onOk={()=>{
                mutateAsync({
                  id: record.id ?? '',
                  resource: 'Carnets',
                  metaData: {
                    operation: "BUY",
                  },
                  values: {
                    value: val
                  },
                }).then(()=>{
                  close()
                  if(open)open({
                    type: "success",
                    message: `${val} Ticket${val > 1?'s':''} purchased`,
                  })
                })
            }}
        >
            <IntegerStep min={1} max={record.nombreEntrees} onChange={setVal}/>
        </Modal>
    </div>
  )
}

export default Buy