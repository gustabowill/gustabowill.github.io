---
title: Análise de recursos e benchmarking com foco no PostgreSQL
event: PgConf Brasil 2026
date: 2026-09-02
slides: https://drive.google.com/file/d/1xDv_F4Ts-nPvWmeHFW-vwAvKqQFstQNf/view?usp=sharing
badge: Video
description: "Uma introdução à análise de performance aplicada ao PostgreSQL, indo além do básico para identificar gargalos em camadas mais profundas."
---

Ao enfrentar problemas de performance, a reação padrão de muitos usuários é checar a latência de queries individualmente
e/ou seu query planner, muitas vezes limitando-se a isso. Embora tal análise seja importante, muitos problemas de
performance têm origem em camadas mais baixas: CPU saturada, contenção de memória, gargalos de I/O e filesystem ou até
um comportamento inesperado do sistema operacional.

Mas como identificar gargalos em componentes que muitas vezes nem sabemos que deveriam ser analisados?

Nesta palestra, serão apresentadas metodologias e ferramentas de análise de performance em Linux, baseadas no renomado
livro Systems Performance de Brendan Gregg, com foco especial no contexto de bancos de dados e PostgreSQL. O objetivo é
expandir a forma como enxergamos problemas de performance, ajudando a revelar os “unknown unknowns” que frequentemente
impactam sua performance sem serem percebidos.

Você aprenderá a:

- Medir e interpretar métricas de recursos do sistema que impactam o PostgreSQL.
- Utilizar ferramentas práticas para benchmarking e análise de performance.
- Identificar gargalos que vão além do básico query plan e latência.
- Construir uma mentalidade baseada em dados para análise e otimização.

Ao final, os participantes estarão mais preparados para investigar camadas menos visíveis do sistema, descobrir gargalos
que frequentemente passam despercebidos e aplicar análises mais profundas para obter melhorias reais e consistentes no
PostgreSQL.
