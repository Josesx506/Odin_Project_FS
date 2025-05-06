import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cardStyle = {
  display: 'flex',
  gap: '0.4em',
  width: '100%',
  padding: '0.3em 0.5em',
  borderRadius: '0.5em',
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  alignItems: 'center',
  maxWidth: '300px',
}

const cardBodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3em',
  padding: '0.2em',
  justifyContent: 'space-between',
  width: '100%'
}

function CCSkeleton() {
  return (
    <div style={cardStyle}>
      <Skeleton style={{ flex: 1 }} circle width={'60px'} height={'60px'} />
      <div style={cardBodyStyle}>
        <h4 style={{ flex: 1 }}><Skeleton width={'150px'} /></h4>
        <div style={{ flex: 1 }}><Skeleton width={'100%'} /></div>
        <div style={{ flex: 1, marginLeft: 'auto' }}><Skeleton width={'50px'} /></div>
      </div>
    </div>
  )
}

function GCSkeleton() {
  return (
    <div style={cardStyle}>
      <Skeleton style={{ flex: 1 }} circle width={'60px'} height={'60px'} />
      <div style={cardBodyStyle}>
        <h4 style={{ flex: 1 }}><Skeleton width={'150px'} /></h4>
        <div style={{ flex: 1 }}><Skeleton width={'100%'} /></div>
      </div>
    </div>
  )
}


export { CCSkeleton, GCSkeleton }
