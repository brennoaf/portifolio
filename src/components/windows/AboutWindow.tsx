"use client";

import ProfilePicture from "@/components/ProfilePicture";
import DraggableWindow from "@/components/windows/@global/DraggableWindow";

interface AboutWindowProps {
  id: string;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
}

export default function AboutWindow({ id, onClose, onMinimize }: AboutWindowProps) {
  return (
    <DraggableWindow
      id={id}
      title="Sobre Mim"
      width={480}
      onClose={onClose}
      onMinimize={onMinimize}
    >

      <div className="flex flex-row items-center gap-3">
        <ProfilePicture size={7} />
        <div>
          <p className="font-bold text-base">Brenno França</p>
          <p>Desenvolvedor Fullstack</p>
          <p>Estudante de Engenharia da Computação</p>
        </div>
      </div>

      <div className="my-2">
        <fieldset className="group-box">
          <legend className="bg-[#f0f0f0] px-2 text-gray-700">Sobre o Usuário</legend>
          <p>
            Desenvolvedor fullstack e estudante apaixonado por transformar ideias em sistemas funcionais e úteis.
            Atua como <strong>Tutor de Análise de Dados</strong> no <strong>CESAR (Centro de Estudos e Sistemas Avançados do Recife)</strong>, 
            auxiliando alunos em temas como SQL, Excel e visualização de dados.
          </p>
          <p className="mt-1">
            Também trabalha como <strong>Desenvolvedor Fullstack</strong> na <strong>Secretaria de Desenvolvimento Econômico do Recife</strong>, 
            contribuindo para o <strong>Observatório Econômico do Recife</strong>, onde desenvolve APIs, cuida da integração de dados públicos e 
            cria visualizações interativas.
          </p>
          <p className="mt-1">
            Recentemente, idealizou uma nova arquitetura de transmissão e consumo de big data no navegador, 
            que permite carregar pacotes de dados gigantescos com eficiência. 
            A solução combina pacotes <strong>atualizáveis</strong>,
            descompactação via <strong>WebAssembly</strong>, e armazenamento inteligente no <strong>IndexedDB</strong>, 
            permitindo que a aplicação funcione de forma leve, rápida e offline-friendly, mesmo com dezenas de megabytes de dados históricos.
          </p>

          <p className="mt-1">
            Já participou de hackathons, criou projetos educacionais e curte desenvolver soluções que equilibram 
            tecnologia, acessibilidade e propósito.
          </p>
        </fieldset>

        <fieldset className="group-box mt-2">
          <legend className="bg-[#f0f0f0] px-2 text-gray-700">Contatos</legend>
          <div className="field-row" style={{ flexWrap: "wrap", gap: "6px" }}>
            <a href="https://github.com/brennoaf" target="_blank" className="button">
              GitHub
            </a>
            <a href="https://linkedin.com/in/brenno-françaa" target="_blank" className="button">
              LinkedIn
            </a>
            <a href="http://lattes.cnpq.br/4045787682464238" target="_blank" className="button">
              Lattes
            </a>
            <a href="mailto:brennomalafaia15@gmail.com" className="button">
              Email
            </a>
            {/* <a href="https://portfolio.exemplo.com" target="_blank" className="button">
              Portfólio
            </a> */}
          </div>
        </fieldset>
      </div>
    </DraggableWindow>
  );
}
