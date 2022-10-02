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
        div {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          font-size: 1.2rem;
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(15px) !important; 
          background: white;
        }
      `}</style>
      <div className="top uk-padding-small">
       <a onClick={()=>router.back()} className="bi-chevron-left"> <span className="uk-text-muted">{props.name}</span></a>  
       </div>  
  </>
 )
}