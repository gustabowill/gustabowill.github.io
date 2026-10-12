---
title: "Postgres locks: Tipos e usos"
event: PgConf Brasil 2025
date: 2025-09-05
href: https://www.youtube.com/watch?v=6uwVNjKhuQU
slides: https://drive.google.com/file/d/140nK6xdcHv0LQS2Tn2HkDpVjRjzUsxhG/view?usp=sharing
badge: Video
description: Uma introdução aos diferentes tipos the locks existentes no Postgres, seus propósitos, quando e como ocorrem e de que forma podem afetar a performance
---

Nesta palestra, vamos explorar os diferentes tipos de locks existentes no Postgres, entender quais operações adquirem
quais tipos de locks e como isso pode impactar a performance das suas queries SQL. Também veremos como identificar locks
ativos em tempo real e interpretar as informações expostas pelas interfaces do Postgres.

O objetivo é fornecer uma visão introdutória, clara e prática sobre como o Postgres gerencia concorrência e garante a
consistência das transações, dando uma idéia do que acontece por de baixo dos panos quando múltiplas sessões acessam
dados concorrentemente. A palestra é voltada para quem já usa o Postgres no dia a dia e deseja compreender melhor o
mecanismo de locking e como diagnosticar possíveis problemas de concorrência no banco.
