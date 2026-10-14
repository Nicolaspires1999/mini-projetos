"""Calculadora de linha de comando em Python.

Operações: soma, subtração, multiplicação, divisão, potência, resto
e raiz quadrada. Guarda o histórico da sessão.
"""

import math


def somar(a, b):
    return a + b


def subtrair(a, b):
    return a - b


def multiplicar(a, b):
    return a * b


def dividir(a, b):
    if b == 0:
        raise ZeroDivisionError("não é possível dividir por zero")
    return a / b


def potencia(a, b):
    return a ** b


def resto(a, b):
    if b == 0:
        raise ZeroDivisionError("não é possível dividir por zero")
    return a % b


def raiz_quadrada(a):
    if a < 0:
        raise ValueError("não existe raiz quadrada real de número negativo")
    return math.sqrt(a)


OPERACOES = {
    "+": ("Soma", somar),
    "-": ("Subtração", subtrair),
    "*": ("Multiplicação", multiplicar),
    "/": ("Divisão", dividir),
    "^": ("Potência", potencia),
    "%": ("Resto da divisão", resto),
}


def ler_numero(mensagem):
    """Pede um número até o usuário digitar um valor válido."""
    while True:
        texto = input(mensagem).strip().replace(",", ".")
        try:
            return float(texto)
        except ValueError:
            print("Valor inválido. Digite um número, por exemplo 12,5.")


def formatar(n):
    """Mostra inteiros sem casas decimais (8.0 -> 8)."""
    return str(int(n)) if float(n).is_integer() else f"{n:.10g}"


def mostrar_menu():
    print("\n=== CALCULADORA ===")
    for simbolo, (nome, _) in OPERACOES.items():
        print(f"  {simbolo}  {nome}")
    print("  r  Raiz quadrada")
    print("  h  Histórico")
    print("  s  Sair")


def main():
    historico = []
    while True:
        mostrar_menu()
        escolha = input("Escolha uma opção: ").strip().lower()

        if escolha == "s":
            print("Até logo!")
            break

        if escolha == "h":
            if not historico:
                print("Nenhum cálculo ainda.")
            for item in historico:
                print(" ", item)
            continue

        try:
            if escolha == "r":
                a = ler_numero("Número: ")
                r = raiz_quadrada(a)
                conta = f"raiz({formatar(a)}) = {formatar(r)}"
            elif escolha in OPERACOES:
                a = ler_numero("Primeiro número: ")
                b = ler_numero("Segundo número: ")
                r = OPERACOES[escolha][1](a, b)
                conta = f"{formatar(a)} {escolha} {formatar(b)} = {formatar(r)}"
            else:
                print("Opção inválida.")
                continue
        except (ZeroDivisionError, ValueError, OverflowError) as erro:
            print(f"Erro: {erro}")
            continue

        print("Resultado:", conta)
        historico.append(conta)


if __name__ == "__main__":
    main()
