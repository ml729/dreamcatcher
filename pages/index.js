import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useRef, useEffect } from "react"
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
  Box,
  VStack,
  HStack,
  Center,
  Heading,
  useClipboard,
  Flex
} from '@chakra-ui/react'

import { RiCheckboxMultipleFill, RiCheckboxMultipleBlankLine } from "react-icons/ri"
import { IoReload } from "react-icons/io5"

export default function Home() {
  function MulticolorTitle(props) {
    const colors = ["teal", "#befaee", "peachpuff", "pink", "orchid"];
    const coloredChars = Array.from(props.title).map((char, idx) =>
      <span style={{color: colors[idx % colors.length]}}>{char}</span>
    );
    return coloredChars;
  }

  const [allWords, setAllWords] = useState([]);
  useEffect(() => {
    fetch('eff_full.txt')
      .then(response => response.text())
      .then(data => {setAllWords(data.split('\n'));});
  }, []);


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function getNewWord(notInArr=[]) {
    const r = getRandomInt(allWords.length);
    return allWords[r];
  }

  function getNewWordArray(n, arr=[]) {
    while (arr.length < n) {
      const newWord = getNewWord(arr);
      arr = [...arr, newWord];
    }
    return arr;
  }

  function WordButton(props) {
    const words = props.words;
    const handleClick = () => {
      props.setWords(words.filter(w => w !== props.word).concat(getNewWord(words)));
      if (textAreaRef.current.value != "") {
        textAreaRef.current.value += "\n";
      }
      textAreaRef.current.value += props.word;

    }
    return (
      <Button colorScheme='gray' onClick={handleClick}>{props.word}</Button>
    )
  }

  function WordContainer(props) {
    function RegenButton(props) {
      const handleClick = () => {
        // setVisible(false);
        setWords(getNewWordArray(6));   }
      return (
        <Button colorScheme='gray' onClick={handleClick}><IoReload /></Button>
      )
    }
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (allWords.length > 0) {
        setWords(getNewWordArray(6));
        setLoading(false);
      }
    }, [allWords]);

    return (
      <Card id="button-container" w="90%">
        <CardBody>

          <HStack w="100%" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Wrap spacing={4}>
              {loading ? <WrapItem>
      <WordButton word="Loading..." />
    </WrapItem> :
               words.map(w =>
                 <WrapItem>
                   <WordButton setWords={setWords} words={words} word={w} />
                 </WrapItem>)
              }
            </Wrap>
            <Box>
              <RegenButton />
            </Box>
          </HStack>
        </CardBody></Card>
    )
  }

  const textAreaRef = useRef(null);
  function CopyInput(props) {
    const placeholder = props.placeholder;
    const { onCopy, value, setValue, hasCopied } = useClipboard("");

    return (
      <>
        <VStack w="100%" spacing={0}>
          <Textarea
            id="dream-input"
            w="90%"
            h="40vh"
            bg="white"
            fontSize="2em"
            borderBottomRadius="0"
            ref={textAreaRef}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder={placeholder}/>
          <Flex justifyContent="flex-end" w="90%" bg="#E2E8F0"
                borderBottomRadius="var(--chakra-radii-md)">
            <Button
              border-color="black"
              border-style="solid"
              border-left="5px"
              borderTopRadius="0"
              onClick={onCopy}>{hasCopied ? <RiCheckboxMultipleFill />: <RiCheckboxMultipleBlankLine />}</Button>
          </Flex>
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
              <WordContainer />
             </div>

            <div className="centered">
              <CopyInput placeholder="Write anything that you remember"/>
            </div>
          </VStack>

        </main>

        <footer>
          Powered by {'React, next.js, Chakra UI, and react-icons'}
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
