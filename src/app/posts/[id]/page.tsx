import Viewer from '@/components/Editor/Viewer';
import Tags from '@/components/Tags';
import Title from '@/components/Title';
import InnerLayout from '@/layouts/InnerLayout';
import { formatDate } from '@/utils/convert';

const TagsList = [
  { name: 'React', href: '/tags/react' },
  { name: 'Next.js', href: '/tags/nextjs' },
  { name: 'TailwindCSS', href: '/tags/tailwindcss' },
  { name: 'TypeScript', href: '/tags/typescript' },
  { name: 'Server Components', href: '/tags/server-components' },
  { name: 'React Server Components', href: '/tags/react-server-components' },
];

const page = () => {
  return (
    <InnerLayout>
      <div className="flex flex-col gap-2">
        <time dateTime="2024-08-28">
          {formatDate('2024-08-28', { format: 'full' })}
        </time>
        <Title size="large" borderBottom>
          Release of Tailwind Nextjs Starter Blog v2.0
        </Title>
        <Tags tagList={TagsList} />
      </div>
      <Viewer
        content={`
        <h2 id="heading-1">문제상황</h2><p class="paragraph">먼저 해당 블로그는 Next.js로 클라이언트 사이드가 구성되어있다.</p><p class="paragraph">기본적으로 SSR 환경에서 동작하다보니 서버에서 로그를 찍을때 문제가 발생했다.</p><p class="paragraph"></p><p class="paragraph"><img class="editor-image" src="https://static.imkdw.dev/articles/get-browser-info-with-nextjs-ssr-cndwlewg/content-images/f2ae10e5-21d8-4886-b971-502287c6ad57.png" alt="image" style="width: 610px; height: auto; cursor: pointer; margin: 0px auto;" title="image" draggable="true"></p><p class="paragraph"></p><p class="paragraph"></p><h2 id="heading-2">SSR ?</h2><p class="paragraph">SSR은 기본적으로 유저의 요청에 대해서 서버에서 HTML을 다 만들고 내려주는 방식이다.</p><p class="paragraph"></p><p class="paragraph">그러므로 API 호출도 서버사이드에서 진행되기 때문에 기본적으로 userAgent나 IP 정보가 서버의 정보로 남게된다.</p><p class="paragraph"></p><p class="paragraph">Next.js에서는 미들웨어를 통해서 이를 해결할 수 있었다.</p><p class="paragraph"></p><p class="paragraph"></p><p class="paragraph"></p><h2 id="heading-3">Next.js 미들웨어</h2><p class="paragraph">Next.js 14 app router를 기준으로 <a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://nextjs.org/docs/app/building-your-application/routing/middleware">미들웨어</a>는 app/middleware.ts를 생성하면 자동으로 실행된다.</p><p class="paragraph"></p><p class="paragraph">NextRequest는 클라이언트에서 서버로 들어오는 모든 HTTP 요청에 대한 정보를 가지고있다.</p><pre><code class="language-typescript hljs" data-highlighted="yes"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">NextRequest</span>, <span class="hljs-title class_">NextResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'next/server'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-variable constant_">X_REAL_IP</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./constants/header.constants'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">middleware</span>(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">NextRequest</span></span>) {
  <span class="hljs-keyword">const</span> ip = (request.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">'x-forwarded-for'</span>) ?? <span class="hljs-string">'127.0.0.1'</span>).<span class="hljs-title function_">split</span>(<span class="hljs-string">','</span>)[<span class="hljs-number">0</span>];

  <span class="hljs-keyword">const</span> requestHeaders = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Headers</span>(request.<span class="hljs-property">headers</span>);
  requestHeaders.<span class="hljs-title function_">set</span>(<span class="hljs-variable constant_">X_REAL_IP</span>, ip);

  <span class="hljs-keyword">return</span> <span class="hljs-title class_">NextResponse</span>.<span class="hljs-title function_">next</span>({
    <span class="hljs-attr">request</span>: {
      <span class="hljs-attr">headers</span>: requestHeaders,
    },
  });
}
</code></pre><p class="paragraph"></p><p class="paragraph">현재 코드에서는 request.headers.x-forwarded-for에서 ip를 가져오고 있는데, 이건 WAS의 설정마다 다르다.</p><p class="paragraph"></p><p class="paragraph">현재 블로그의 경우 EC2 내부 Nginx에서 WAS로 Nginx를 사용하고 있다.</p><p class="paragraph"></p><p class="paragraph"></p><p class="paragraph"></p><h2 id="heading-4">Nginx 설정</h2><pre><code class="language-typescript hljs" data-highlighted="yes">server {
  location / {
          try_files $uri $uri/ =<span class="hljs-number">404</span>;
          proxy_pass <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:3000;</span>
          proxy_set_header <span class="hljs-title class_">Host</span> $http_host;
          proxy_set_header <span class="hljs-variable constant_">HOST</span> $host;
          proxy_set_header X-<span class="hljs-title class_">Forwarded</span>-<span class="hljs-title class_">For</span> $proxy_add_x_forwarded_for;
          proxy_set_header X-<span class="hljs-title class_">Forwarded</span>-<span class="hljs-title class_">Proto</span> $scheme;
  }

server_name imkdw.<span class="hljs-property">dev</span>;

<span class="hljs-comment">// ...ssl configs</span>
}</code></pre><p class="paragraph"><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://imkdw.dev">https://imkdw.dev</a> 요청에 대해서 localhost:3000으로 프록시를 걸어두었다.</p><p class="paragraph"></p><p class="paragraph">동시에 X-Forwarded-For 헤더에 $proxy_add_x_forwarded_for 값을 넘기는 상태다.</p><p class="paragraph"></p><p class="paragraph">가져온 ip를 requestHedaers 내부에 저장하고 API를 호출하는 service 레이어에서 해당 값을 가져오고 서버로 넘겨주는 구조다.</p><pre><code class="language-typescript hljs" data-highlighted="yes"><span class="hljs-string">'use server'</span>;

<span class="hljs-keyword">import</span> { cookies, headers } <span class="hljs-keyword">from</span> <span class="hljs-string">'next/headers'</span>;

<span class="hljs-keyword">const</span> callSSRApi = <span class="hljs-keyword">async</span> &lt;T&gt;(<span class="hljs-attr">params</span>: <span class="hljs-title class_">CallApiParams</span>): <span class="hljs-title class_">Promise</span>&lt;T&gt; =&gt; {
  <span class="hljs-keyword">const</span> ip = <span class="hljs-title function_">headers</span>().<span class="hljs-title function_">get</span>(<span class="hljs-variable constant_">X_REAL_IP</span>) ?? <span class="hljs-string">''</span>;
  <span class="hljs-keyword">const</span> userAgent = <span class="hljs-title function_">headers</span>().<span class="hljs-title function_">get</span>(<span class="hljs-string">'user-agent'</span>) ?? <span class="hljs-string">''</span>;

  <span class="hljs-keyword">const</span> isFormData = params.<span class="hljs-property">body</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">FormData</span>;

  <span class="hljs-keyword">const</span> url = <span class="hljs-string"></span>;

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
    <span class="hljs-attr">method</span>: params.<span class="hljs-property">method</span>,
    <span class="hljs-attr">headers</span>: {
      ...(!isFormData &amp;&amp; { <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span> }),
      <span class="hljs-title class_">Cookie</span>: <span class="hljs-title function_">cookies</span>().<span class="hljs-title function_">toString</span>(),
      <span class="hljs-string">'x-forwarded-for'</span>: ip,
      <span class="hljs-string">'user-agent'</span>: userAgent,
    },
    <span class="hljs-attr">body</span>: params.<span class="hljs-property">body</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">FormData</span> ? params.<span class="hljs-property">body</span> : <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(params.<span class="hljs-property">body</span>),
  });

  <span class="hljs-keyword">const</span> json = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">if</span> (json?.<span class="hljs-property">errorCode</span>) {
    <span class="hljs-title function_">toastErrorMessage</span>(json.<span class="hljs-property">errorCode</span>);
    <span class="hljs-keyword">const</span> error = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>();
    error.<span class="hljs-property">message</span> = json.<span class="hljs-property">errorCode</span>;
    <span class="hljs-keyword">throw</span> error;
  }

  <span class="hljs-keyword">return</span> json.<span class="hljs-property">data</span>;
};</code></pre><p class="paragraph">이렇게 하면 실제 클라이언트의 IP 주소와 userAgent를 가져와서 서버로 넘길 수 있다.</p><p class="paragraph"></p><p class="paragraph"><img class="editor-image" src="https://static.imkdw.dev/articles/get-browser-info-with-nextjs-ssr-cndwlewg/content-images/fb1075de-f975-4496-ab17-1fa3b0a0f0c4.png" alt="image" style="width: 853px; height: auto; cursor: pointer; margin: 0px auto;" title="image" draggable="true"></p>
      `}
      />

      {/* TODO: 게시글 상세 목차기능  (https://github.com/tscanlin/tocbot) - pc는 오른쪽 사이드, 모바일은 제목과 본문 사이 (velog 참고)*}

      {/* TODO: 이전, 다음 포스트 카드 */}
      {/* TODO: 댓글 갯수 */}
      {/* TODO: 댓글 작성 input 및 버튼 */}
      {/* TODO: 댓글 리스트 */}
    </InnerLayout>
  );
};

export default page;
