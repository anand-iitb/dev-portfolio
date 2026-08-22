import {
  siApachekafka,
  siApachemaven,
  siArgo,
  siC,
  siCplusplus,
  siDocker,
  siElasticsearch,
  siFirebase,
  siGit,
  siGnubash,
  siGo,
  siGrafana,
  siJavascript,
  siKotlin,
  siKubernetes,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPrometheus,
  siPython,
  siPytorch,
  siRedis,
  siSnowflake,
  siSpringboot,
  siNutanix,
} from "simple-icons";

const catalog: Record<string, { path: string; title: string }> = {
  openjdk: siOpenjdk,
  kotlin: siKotlin,
  go: siGo,
  python: siPython,
  cplusplus: siCplusplus,
  gnubash: siGnubash,
  springboot: siSpringboot,
  apachekafka: siApachekafka,
  apachemaven: siApachemaven,
  postgresql: siPostgresql,
  redis: siRedis,
  elasticsearch: siElasticsearch,
  firebase: siFirebase,
  docker: siDocker,
  kubernetes: siKubernetes,
  prometheus: siPrometheus,
  grafana: siGrafana,
  argo: siArgo,
  javascript: siJavascript,
  c: siC,
  nodedotjs: siNodedotjs,
  snowflake: siSnowflake,
  git: siGit,
  pytorch: siPytorch,
  nutanix: siNutanix,
};

const marks: Record<string, string> = {
  aws: "M4 16l8 4 8-4v-3l-8 4-8-4v3zm0-5l8 4 8-4V8L12 12 4 8v3zM12 4L4 8l8 4 8-4-8-4z",
  s3: "M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3v10c0 1.7-3.6 3-8 3s-8-1.3-8-3V7zm8-1.2c-3.3 0-6 .8-6 1.7s2.7 1.7 6 1.7 6-.8 6-1.7-2.7-1.7-6-1.7z",
  dynamodb: "M4 5h16v3H4V5zm0 5.5h16v3H4v-3zM4 16h16v3H4v-3z",
  grpc: "M12 3.5A2.5 2.5 0 1 1 9.5 6 2.5 2.5 0 0 1 12 3.5zm-7.5 13A2.5 2.5 0 1 1 2 19a2.5 2.5 0 0 1 2.5-2.5zm15 0A2.5 2.5 0 1 1 17 19a2.5 2.5 0 0 1 2.5-2.5zM10.4 7.6l-4.2 7.2M13.6 7.6l4.2 7.2",
  protobuf: "M6 4h12v3H6V4zm-2 5h16v3H4V9zm2 5h12v3H6v-3zm-2 5h16v3H4v-3z",
  rest: "M8 6L3 12l5 6M16 6l5 6-5 6M13 5l-2 14",
  sql: "M12 3c-4.4 0-8 1.3-8 3v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0-1.7-3.6-3-8-3zm0 2c3.3 0 6 .8 6 1.5S15.3 8 12 8 6 7.2 6 6.5 8.7 5 12 5z",
  navi: "M12 2L2 22l10-4 10 4z",
  iitb: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  xii: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z",
  x: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z",
};

const filled = new Set(["aws", "s3", "dynamodb", "protobuf", "sql", "navi", "iitb", "xii", "x", "nutanix"]);

export function TechIcon({
  slug,
  title,
  className = "h-3.5 w-3.5 shrink-0 text-muted",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const icon = catalog[slug];
  const mark = marks[slug];
  if (!icon && !mark) return null;
  const useFill = Boolean(icon) || filled.has(slug);

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill={useFill ? "currentColor" : "none"}
      stroke={useFill ? "none" : "currentColor"}
      strokeWidth={useFill ? undefined : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      <path d={icon?.path ?? mark} />
    </svg>
  );
}
