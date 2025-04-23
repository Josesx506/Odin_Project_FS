'use client';

import React, { useRef } from 'react';
import Form from 'next/form'
import { FormField } from './FormField';

export default function RegisterImage() {
  const urlRef = useRef();
  const widthRef = useRef();
  const heightRef = useRef();

  let formStyle = {
    display:'grid',gap:'0.5em', padding: '0.4em 0.5em',
    width: 'min(95%,450px)', margin: '0 auto', borderRadius: '0.5em',
    boxShadow:'rgba(0, 0, 0, 0.05) 0px 0px 0px 3px'
  }

  return (
    <div>
      <Form style={formStyle}>
        <FormField name={'url'} label={'Image URL:'} placeholder={'Enter image Url'} ref={urlRef} />
        <FormField name={'width'} label={'Image width:'} placeholder={'Enter image width in px'} ref={widthRef} />
        <FormField name={'height'} label={'Image height:'} placeholder={'Enter image height in px'} ref={heightRef} />
        <div style={{display: 'flex'}}>
          <button style={{margin: '0 auto'}} type="submit">Register image</button>
        </div>
      </Form>
    </div>
  )
}
