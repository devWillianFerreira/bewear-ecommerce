# BEWEAR --- E-commerce de Roupas

Sistema de comércio eletrônico full stack que oferece uma experiência de compra imersiva de ponta a ponta: da vitrine ao pagamento, com acompanhamento detalhado de pedidos.

O projeto foi construído com **Next.js 15, React 19 e TypeScript**,
utilizando PostgreSQL para persistência de dados, Drizzle ORM para
acesso ao banco, Better Auth para autenticação e Stripe para
processamento de pagamentos.


## Prévia do projeto

<p align="center">
<img src="docs/images/homePage-bewear.png" alt="Página inicial da BEWEAR" width="100%" />
</p>

<p align="center">
<img src="docs/images/product-bewear.png" alt="Página do Produto" wid
</p>


## Índice

-   [Funcionalidades](#funcionalidades)
-   [Tecnologias utilizadas](#tecnologias-utilizadas)
-   [Arquitetura e organização](#arquitetura-e-organização)
-   [Rotas da aplicação](#rotas-da-aplicação)
-   [Server Actions](#server-actions)
-   [API e integrações](#api-e-integrações)
-   [Configuração do ambiente](#configuração-do-ambiente)
-   [Executando o projeto](#executando-o-projeto)
-   [Scripts e comandos](#scripts-e-comandos)
-   [Observações](#observações)


## Funcionalidades

### Autenticação e usuários

-   Cadastro de usuários com e-mail e senha.
-   Login com e-mail e senha.
-   Autenticação social com Google OAuth.
-   Gerenciamento de sessões com Better Auth.
-   Proteção de páginas que exigem autenticação.

### Catálogo e produtos

-   Página inicial com vitrines de produtos e marcas parceiras.
-   Navegação por categorias.
-   Página individual de produto.
-   Seleção de variantes por cor.
-   Exibição de preço, descrição e imagem da variante.
-   Busca de produtos por nome.
-   Exibição de produtos relacionados da mesma categoria.

### Carrinho de compras

-   Adição de produtos e variantes ao carrinho.
-   Incremento e decremento de quantidades.
-   Remoção de itens.
-   Persistência dos itens no PostgreSQL.
-   Cálculo automático do subtotal e total com base nos preços e
    quantidades.

### Endereços e checkout

-   Cadastro de endereços de entrega.
-   Consulta e seleção de endereços vinculados ao usuário.
-   Revisão dos itens antes da compra.
-   Fluxo de compra organizado em etapas: sacola, identificação e
    pagamento.
-   Criação de pedido a partir dos itens do carrinho.
-   Integração com Stripe Checkout para pagamento com cartão.

### Pedidos e pagamentos

-   Registro dos pedidos e respectivos itens.
-   Armazenamento do preço dos itens no momento da criação do pedido.
-   Confirmação de pagamento por webhook do Stripe.
-   Atualização do status do pedido após a confirmação do pagamento.
-   Página de retorno para sucesso e cancelamento.
-   Histórico de pedidos do usuário.

### Interface e experiência

-   Layout responsivo para diferentes tamanhos de tela.
-   Componentes reutilizáveis baseados em Radix UI e shadcn/ui.
-   Carrosséis com Embla Carousel.
-   Feedback visual com notificações toast usando Sonner.
-   Formulários com validação e mensagens de erro.
-   Gerenciamento de estado assíncrono com TanStack Query.

## Tecnologias utilizadas


### Frontend

- Next.js                                    15.4.10 Framework React, App
                                                     Router e recursos
                                                     server-side

- React                                       19.1.0 Construção da
                                                     interface

- TypeScript                                     5.x Tipagem estática

- Tailwind CSS                                   4.x Estilização

- Radix UI                 1.x / pacotes individuais Primitivos acessíveis
                                                     para componentes

- shadcn/ui                   Componentes no projeto Base de componentes
                                                     customizáveis

- Lucide React                               0.536.0 Ícones

- Embla Carousel React                         8.6.0 Carrosséis



### Backend, banco de dados e autenticação

- PostgreSQL                                     --- Banco de dados
                                                     relacional

- Drizzle ORM                                 0.44.2 Consultas e operações
                                                     tipadas no banco

- Drizzle Kit                                 0.31.4 Geração e aplicação
                                                     de alterações no
                                                     schema

- Better Auth                                 1.2.12 Autenticação e
                                                     sessões

- Stripe                                      18.4.0 Criação de sessões de
                                                     checkout e integração
                                                     de pagamentos
 

### Formulários, validação e estado

- React Hook Form                             7.62.0 Gerenciamento de
                                                     formulários

- Zod                                         4.0.15 Validação de dados e
                                                     schemas

- Hookform Resolvers                           5.2.1 Integração entre
                                                     React Hook Form e Zod

- TanStack React Query                        5.83.0 Cache e gerenciamento
                                                     de consultas
                                                     assíncronas

- Sonner                                       2.0.7 Notificações toast

- React Number Format                          5.4.4 Formatação de valores
                                                     numéricos

  
### Ferramentas de desenvolvimento

-   ESLint 9 e eslint-config-next.
-   Prettier 3 com plugin para Tailwind CSS.
-   Drizzle Kit para gerenciamento do schema.
-   TSX para execução de arquivos TypeScript em scripts.

> As versões acima refletem as dependências declaradas no
> `package.json`. As versões efetivamente instaladas são determinadas
> pelo `package-lock.json`.

## Arquitetura e organização

A aplicação utiliza o **App Router do Next.js**. As páginas são
organizadas por funcionalidades dentro de `src/app`, enquanto operações
de negócio que precisam ser executadas no servidor ficam em
`src/actions`.

A camada de persistência utiliza Drizzle ORM conectado ao PostgreSQL. O
schema centraliza as tabelas e relações do domínio. A autenticação é
gerenciada pelo Better Auth com o adaptador Drizzle.

O fluxo de pagamento é dividido em três partes: 1. O pedido é criado no
banco a partir do carrinho e do endereço selecionado. 2. Uma sessão de
pagamento é criada no Stripe Checkout. 3. O Stripe envia um evento ao
webhook da aplicação, que atualiza o pedido para `paid` após a
confirmação do pagamento.

### Estrutura do Projeto 

``` text
bewear-ecommerce/
├── public/                         # Banners, logos e arquivos estáticos
├── src/
│   ├── actions/                    # Server Actions e validações
│   │   ├── add-cart-products/
│   │   ├── create-checkout-session/
│   │   ├── create-shipping-address/
│   │   ├── decrease-cart-product-quantity/
│   │   ├── finish-order/
│   │   ├── get-address/
│   │   ├── get-cart/
│   │   ├── get-searchProduct/
│   │   ├── remove-cart-products/
│   │   └── update-cart-shipping-address/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...all]/      # Handlers do Better Auth
│   │   │   └── stripe/webhook/     # Webhook do Stripe
│   │   ├── authentication/         # Login e cadastro
│   │   ├── cart/                   # Sacola e etapas da compra
│   │   ├── category/[slug]/        # Página de categoria
│   │   ├── checkout/               # Retorno do pagamento
│   │   ├── my-orders/              # Histórico de pedidos
│   │   ├── product-variant/[slug]/ # Detalhes da variante
│   │   ├── hooks/
│   │   │   ├── mutations/          # Mutations do TanStack Query
│   │   │   └── queries/            # Queries do TanStack Query
│   │   └── helpers/                # Funções auxiliares da aplicação
│   ├── components/
│   │   ├── commom/                 # Componentes compartilhados da loja
│   │   └── ui/                     # Componentes de interface
│   ├── db/
│   │   ├── index.ts                # Instância do Drizzle
│   │   ├── schema.ts               # Tabelas e relações
│   │   └── seed.ts                 # Dados iniciais
│   ├── lib/                        # Configurações de autenticação e utilitários
│   ├── middleware.ts               # Proteção de rotas
│   └── providers/                  # Providers React
├── auth-schema.ts
├── drizzle.config.ts
├── next.config.ts
├── package.json
└── README.md
```


## Rotas da aplicação

### Páginas Públicas

- GET               `/`                         Página inicial,   Público
                                                vitrines e        
                                                catálogo          

- GET               `/authentication`           Login e cadastro  Público

- GET               `/category/[slug]`          Produtos de uma   Público
                                                categoria         

- GET               `/product-variant/[slug]`   Detalhes de uma   Público
                                                variante de       
                                                produto

### Carrinho e Checkout     

- GET               `/cart/review`              Revisão da sacola Autenticado

- GET               `/cart/identification`      Cadastro e        Autenticado
                                                seleção do        
                                                endereço          

- GET               `/cart/confirmation`        Confirmação dos   Autenticado
                                                dados e início do 
                                                pagamento         

- GET               `/my-orders`                Histórico de      Autenticado
                                                pedidos           

- GET               `/checkout/success/[id]`    Retorno de        Autenticado
                                                pagamento         
                                                confirmado        

- GET               `/checkout/cancel/[id]`     Retorno de        Autenticado
                                                checkout          
                                                cancelado

### API Routes

- GET/POST `/api/auth/[...all]` - Autenticação com Better Auth.
- POST `/api/stripe/webhook` - Confirmação de pagamentos via Stripe.


## Server Actions

As Server Actions concentram operações de negócio executadas no
servidor. Os dados recebidos por ações que possuem schema são validados
com Zod, e as operações relacionadas ao usuário verificam sua sessão.

### Carrinho

- `addProductToCart`                  Adiciona uma variante ao carrinho
                                      ou incrementa sua quantidade

- `decreaseCartProductQuantity`       Diminui a quantidade de um item;
                                      remove o item quando a quantidade
                                      atual é 1

- `removeProductFromCart`             Remove um item do carrinho

- `getCart`                           Busca o carrinho do usuário e
                                      calcula o total


### Endereços

- `createShippingAddress`             Cadastra um endereço de entrega

- `getAddress`                        Lista os endereços do usuário

- `updateCartShippingAddress`         Associa um endereço existente ao
                                      carrinho

### Produtos

- `getSearchProducts`                 Pesquisa produtos pelo nome, com
                                      limite de resultados

### Pedidos e pagamentos

- `FinishOrder`                       Cria o pedido e seus itens a partir
                                      do carrinho selecionado

- `createChechoutSession`             Cria uma sessão de pagamento no
                                      Stripe Checkout

> Os identificadores acima respeitam os nomes exportados no código.
> Algumas ações são exportadas como `default`, enquanto outras utilizam
> exportação nomeada.


## Configuração do ambiente

### Pré-requisitos

-   Node.js compatível com Next.js 15.
-   npm.
-   PostgreSQL disponível localmente ou por um serviço gerenciado.
-   Conta Stripe para configurar o ambiente de pagamentos.
-   Projeto OAuth do Google, caso queira habilitar o login social.

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

``` env
# Aplicação
NEXT_PUBLIC_APP_URL=http://localhost:3000

# PostgreSQL
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE

# Better Auth
BETTER_AUTH_SECRET=seu_secret_forte
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_sua_chave
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica
```

**Importante:** substitua todos os valores de exemplo pelas credenciais
do seu ambiente. Nunca envie `.env.local`, chaves privadas ou segredos
para o GitHub.

O `BETTER_AUTH_SECRET` deve ser um segredo forte e exclusivo do
ambiente. Configure também a URL de callback do Google OAuth de acordo
com a configuração do Better Auth e o endereço local ou publicado da
aplicação.

### Instalação

Clone o repositório e entre na pasta:

``` bash
git clone https://github.com/devWillianFerreira/bewear-ecommerce.git
cd bewear-ecommerce
```

Instale as dependências:

``` bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env.local`.

### Banco de dados

Com o PostgreSQL disponível e a variável `DATABASE_URL` configurada,
aplique o schema:

``` bash
npx drizzle-kit push
```

O comando `push` sincroniza o schema definido em `src/db/schema.ts` com
o banco configurado.

Para utilizar o fluxo baseado em migrations do Drizzle Kit em vez de
`push`, gere e aplique as migrations:

``` bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Dados iniciais

Para inserir as categorias, produtos e variantes de exemplo:

``` bash
npx tsx src/db/seed.ts
```

> **Atenção:** o seed atual limpa as tabelas de variantes, produtos e
> categorias antes de inserir os dados novamente. Execute-o somente em
> um banco de desenvolvimento ou em uma base que possa ser
> reinicializada. Não execute em uma base com dados que deseja
> preservar.

### Executar localmente

Inicie o servidor de desenvolvimento:

``` bash
npm run dev
```

Acesse <http://localhost:3000>.

## 🔧 Scripts e comandos

Os scripts atualmente definidos no `package.json` são:

  Comando           Descrição
  ----------------- --------------------------------------------------
  `npm run dev`     Inicia o servidor de desenvolvimento
  `npm run build`   Gera a build de produção
  `npm start`       Inicia a aplicação em modo de produção
  `npm run lint`    Executa o comando de lint configurado no projeto

Comandos do Drizzle Kit e do seed são executados diretamente via `npx`,
conforme descrito na seção de banco de dados. Eles não estão cadastrados
como scripts no `package.json`.

## Observações

-   O processamento de pagamentos depende de credenciais válidas do
    Stripe e de um webhook configurado para apontar para
    `/api/stripe/webhook`.
-   Para desenvolvimento local, utilize as chaves de teste do Stripe e
    encaminhe os eventos do Stripe para o endpoint local usando a
    ferramenta Stripe CLI.
-   O login com Google depende das credenciais OAuth e das URLs de
    callback configuradas corretamente.
-   O projeto utiliza imagens de produtos hospedadas externamente; a
    origem `d4lgxe9bm8juw.cloudfront.net` está liberada na configuração
    de imagens do Next.js.
-   O seed é destinado à preparação de dados de desenvolvimento e não
    deve ser executado em produção.

------------------------------------------------------------------------

Desenvolvido por **Willian Ferreira**.
