/** @jsx jsx */
import {Code} from './Code'
import {
    Box,
    Callout,
    Heading,
    Kbd,
    PseudoBox,
    Text,
    useColorMode,
    Link as ChakraLink,
    Link,
} from '@chakra-ui/core'
import { jsx } from '@emotion/core'
import NextLink from 'next/link'
import { forwardRef } from 'react'
import {
    NavBar,
    Button,
    LandingProvider,
    PageContainer,
    Footer,
} from 'react-landing'


const Pre = (props) => <Box my='2em' rounded='sm' {...props} />

const Table = (props) => (
    <Box as='table' textAlign='left' mt='32px' width='full' {...props} />
)

const THead = (props) => {
    const { colorMode } = useColorMode()
    const bg = { light: 'gray.50', dark: 'whiteAlpha.100' }
    return (
        <Box
            as='th'
            bg={bg[colorMode]}
            fontWeight='semibold'
            p={2}
            fontSize='sm'
            {...props}
        />
    )
}

const TData = (props) => (
    <Box
        as='td'
        p={2}
        borderTopWidth='1px'
        borderColor='inherit'
        fontSize='sm'
        whiteSpace='normal'
        {...props}
    />
)

const DocsHeading = (props) => (
    <Heading
        mb='1em'
        mt='2em'
        css={{
            '&[id]': {
                pointerEvents: 'none',
            },
            '&[id]:before': {
                display: 'block',
                height: ' 6rem',
                marginTop: '-6rem',
                visibility: 'hidden',
                content: `""`,
            },
            '&[id]:hover a': { opacity: 1 },
        }}
        {...props}
    >
        <Box pointerEvents='auto'>
            {props.children}
            {props.id && (
                <ChakraLink
                    aria-label='anchor'
                    as='a'
                    color='teal.500'
                    fontWeight='normal'
                    outline='none'
                    _focus={{ opacity: 1, boxShadow: 'outline' }}
                    opacity={0}
                    ml='0.375rem'
                    href={`#${props.id}`}
                >
                    #
                </ChakraLink>
            )}
        </Box>
    </Heading>
)

export function Wrapper(props) {
    console.log({wrapperPorps: props})
    // TODO show breadcrumbs based on exported breadcrumbs array
    // TODO add footer, sidebar, toc, ...
    const breadcrumbs = props.breadcrumbs || []

    return (
        <LandingProvider primary='#FF593D'>
            <PageContainer>
                {props.children}
            </PageContainer>
        </LandingProvider>
    )
}

const MDXComponents = {
    wrapper: Wrapper,
    h1: (props) => <Heading as='h1' size='xl' my='1em' {...props}></Heading>,
    h2: (props) => (
        <DocsHeading
            as='h2'
            fontWeight='semibold'
            size='lg'
            {...props}
        ></DocsHeading>
    ),
    h3: (props) => (
        <DocsHeading
            as='h3'
            size='md'
            fontWeight='medium'
            {...props}
        ></DocsHeading>
    ),
    inlineCode: (props) => (
        <Code variantColor='yellow' fontSize='0.84em' {...props} />
    ),
    code: Code, // TODO add docz code block
    pre: Pre,
    kbd: Kbd,
    br: (props) => <Box height='24px' {...props} />,
    hr: (props) => <Box as='hr' borderTopWidth='1px' my={8} {...props} />,
    table: Table,
    th: THead,
    td: TData,
    a: ({ href = '', ...props }) => (
        <NextLink href={href} passHref>
            <Link {...props} />
        </NextLink>
    ),
    p: (props) => <Text as='p' mt={4} lineHeight='tall' {...props} />,
    ul: (props) => <Box as='ul' pt='8px' pl='16px' {...props} />,
    ol: (props) => <Box as='ol' pt='8px' pl='16px' {...props} />,
    li: (props) => <Box as='li' pb='4px' {...props} />,
    blockquote: (props) => (
        <Callout
            mt={4}
            variant='left-accent'
            status='warning'
            css={{ '> *:first-of-type': { marginTop: 0 } }}
            {...props}
        />
    ),
}

// const ChakraProvider = ({ children, theme }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <ColorModeProvider>
//         <CSSReset />
//         {children}
//       </ColorModeProvider>
//     </ThemeProvider>
//   );
// };

export default MDXComponents
