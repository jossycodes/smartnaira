import {useRouter} from 'next/router'
import Head from 'next/head' 
export default function TopNav(props) {
  const router = useRouter(); 
 return (
  <>
     <Head>
        <title>{props.title || props.name}</title>
        <meta name="description" content="" />
      </Head>
      <style jsx>{`
        .top {
          position: sticky;
          top: 0;
          left: 0;
          width: 100vw !important;
          font-size: 1.1rem;
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(15px) !important;   
          background: white;
          text-transform: uppercase;
          z-index: 5; 
        } 
      `}</style>
      <div className="top uk-padding-small"> 
       <a onClick={()=>router.back()} className="bi-arrow-left uk-text-muted"> <span className="uk-text-muted">{props.name}</span></a>   
       </div>   
  </>
 )
}