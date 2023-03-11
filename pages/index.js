import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  ChakraProvider,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  ButtonGroup,
  Wrap,
  WrapItem,
  VStack,
  Center,
  Heading,
  useClipboard,
  Flex
} from '@chakra-ui/react'

import { RiCheckboxMultipleFill, RiCheckboxMultipleBlankLine } from "react-icons/ri"

export default function Home() {
  function MulticolorTitle(props) {
        const colors = ["teal", "#befaee", "peachpuff", "pink", "orchid"];
        const coloredChars = Array.from(props.title).map((char, idx) =>
          <span style={{color: colors[idx % colors.length]}}>{char}</span>
        );
        return coloredChars;
      }
  function WordButton(props) {
    function handleClick(e) {

    }

    return <Button colorScheme='gray' onClick={handleClick}>{props.word}</Button>

  }

  function CopyInput(props) {
    const placeholder = props.placeholder;
    const { onCopy, value, setValue, hasCopied } = useClipboard("");

    return (
      <>
        <VStack w="100%" spacing={4}>
          <Textarea
            id="dream-input"
            w="90%"
            h="40vh"
            bg="white"
            fontSize="2em"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder={placeholder}/>
        <Button onClick={onCopy}>{hasCopied ? <RiCheckboxMultipleFill />: <RiCheckboxMultipleBlankLine />}</Button>
        </VStack>
      </>
    )

  }
  return (
    <ChakraProvider>
    <div className={styles.container}>
      <Head>
        <title>Dreamcatcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        <Heading mt="3%" className={styles.title}>
          {/* <span style={{color: "teal"}}>Dream</span><span style={{color: "pink"}}>catcher</span> */}
          <MulticolorTitle title="Dreamcatcher"/>
        </Heading>
        <VStack
          spacing={4}
          align='stretch'
          h="100%"
          w="100%">
        <div className="centered">
        <Card id="button-container" w="90%">
          <CardBody>
            <Wrap spacing={4}>
              <WrapItem>
                <Button colorScheme='gray'>cat</Button>
              </WrapItem>
            </Wrap>
          </CardBody>
        </Card>
        </div>

          <div className="centered">
          {/* <Textarea id="dream-input" w="90%" h="40vh" bg="white" fontSize="2em" placeholder='Write anything that you remember' /> */}
            <CopyInput placeholder="Write anything that you remember"/>
      </div>
        </VStack>
        {/* <p className={styles.description}> */}
        {/*   lol <code>pages/index.js</code> */}
        {/* </p> */}

        <div className={styles.grid}>
          {/* <a href="https://nextjs.org/docs" className={styles.card}> */}
          {/*   <h3>Documentation &rarr;</h3> */}
          {/*   <p>Find in-depth information about Next.js features and API.</p> */}
          {/* </a> */}

          {/* <a href="https://nextjs.org/learn" className={styles.card}> */}
          {/*   <h3>Learn &rarr;</h3> */}
          {/*   <p>Learn about Next.js in an interactive course with quizzes!</p> */}
          {/* </a> */}

          {/* <a */}
          {/*   href="https://github.com/vercel/next.js/tree/master/examples" */}
          {/*   className={styles.card} */}
          {/* > */}
          {/*   <h3>Examples &rarr;</h3> */}
          {/*   <p>Discover and deploy boilerplate example Next.js projects.</p> */}
          {/* </a> */}

          {/* <a */}
          {/*   href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" */}
          {/*   className={styles.card} */}
          {/* > */}
          {/*   <h3>Deploy &rarr;</h3> */}
          {/*   <p> */}
          {/*     Instantly deploy your Next.js site to a public URL with Vercel. */}
          {/*   </p> */}
          {/* </a> */}
        </div>
      </main>

      <footer>
        Powered by {'React and Next.js'}
      </footer>

      <style jsx>{`
        main {
          /* padding: 5rem 0; */
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          background-color: lightblue;
        }
        .centered {
          display: flex;
          justify-content: center;
        }
/* .main > * { */
/* } */
        /* main > * { */
        /*   background-color: black; */
        /*   margin-top: 50px; */
        /* } */

/* } */
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </ChakraProvider>
  )
}
