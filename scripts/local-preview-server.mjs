import { createReadStream } from "node:fs";
import { readFileSync } from "node:fs";
import { access, readFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { GET as getShows } from "../api/shows.mjs";
import { POST as postClick } from "../api/click.mjs";
import { GET as getImpactHealth } from "../api/impact/health.mjs";
import { GET as getImpactProducts } from "../api/impact/products.mjs";
import { POST as postImpactTrackingLinks } from "../api/impact/tracking-links.mjs";
import { GET as getOut, POST as postOut } from "../api/out.mjs";
import { onRequestPost as postSignup } from "../functions/api/signup.js";
import { onRequestPost as postAnalytics } from "../functions/api/analytics.js";

const port = Number.parseInt(process.env.PORT || "4173", 10);
const rootDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicDir = path.join(rootDir, "public");

function loadDevVars() {
  const varsPath = path.join(rootDir, ".dev.vars");
  let raw = "";
  try {
    raw = readFileSync(varsPath, "utf8");
  } catch (error) {
    return;
  }

  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex < 0) return;
    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();
    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  });
}

loadDevVars();

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function sendNodeResponse(nodeResponse, webResponse) {
  nodeResponse.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => {
    nodeResponse.setHeader(key, value);
  });

  if (!webResponse.body) {
    nodeResponse.end();
    return;
  }

  const reader = webResponse.body.getReader();
  const pump = () =>
    reader.read().then(({ done, value }) => {
      if (done) {
        nodeResponse.end();
        return;
      }
      nodeResponse.write(Buffer.from(value));
      return pump();
    });

  pump().catch((error) => {
    nodeResponse.statusCode = 500;
    nodeResponse.end(String(error));
  });
}

async function serveStatic(filePath, response) {
  try {
    await access(filePath);
    const ext = path.extname(filePath).toLowerCase();
    response.statusCode = 200;
    response.setHeader("Content-Type", contentTypes[ext] || "application/octet-stream");
    createReadStream(filePath).pipe(response);
    return true;
  } catch (error) {
    return false;
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || `127.0.0.1:${port}`}`);

  if (request.method === "GET" && url.pathname === "/api/shows") {
    const webResponse = await getShows(new Request(url));
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/impact/health") {
    const webResponse = await getImpactHealth(new Request(url));
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/impact/products") {
    const webResponse = await getImpactProducts(new Request(url));
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/impact/tracking-links") {
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    const webResponse = await postImpactTrackingLinks(
      new Request(url, {
        method: "POST",
        headers: request.headers,
        body: Buffer.concat(chunks)
      })
    );
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/out") {
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    const webResponse = await postOut(
      new Request(url, {
        method: "POST",
        headers: request.headers,
        body: Buffer.concat(chunks)
      })
    );
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/out") {
    const webResponse = await getOut(new Request(url, { method: "GET", redirect: "manual" }));
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/click") {
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    const webResponse = await postClick(
      new Request(url, {
        method: "POST",
        headers: request.headers,
        body: Buffer.concat(chunks)
      })
    );
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/signup") {
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    const webResponse = await postSignup({
      request: new Request(url, {
        method: "POST",
        headers: request.headers,
        body: Buffer.concat(chunks)
      }),
      env: {}
    });
    sendNodeResponse(response, webResponse);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/analytics") {
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    const webResponse = await postAnalytics({
      request: new Request(url, {
        method: "POST",
        headers: request.headers,
        body: Buffer.concat(chunks)
      }),
      env: {}
    });
    sendNodeResponse(response, webResponse);
    return;
  }

  const staticPath = url.pathname === "/" ? path.join(publicDir, "index.html") : path.join(publicDir, url.pathname);
  if (await serveStatic(staticPath, response)) {
    return;
  }

  if (!path.extname(url.pathname)) {
    const html = await readFile(path.join(publicDir, "index.html"));
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(html);
    return;
  }

  response.statusCode = 404;
  response.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local preview server running at http://127.0.0.1:${port}`);
});
