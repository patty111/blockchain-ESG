import networkx as nx
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('transactions.csv')

# Create an directed graph
G = nx.DiGraph()

for _, transaction in df.iterrows():
    # try:
    G.add_node(transaction['from'])
    G.add_node(transaction['to'])

    value = int(transaction['value'], 16)
    G.add_edge(transaction['from'], transaction['to'], weight=value)


betweenness_scores = nx.betweenness_centrality(G)

# Print the top 10 nodes with the highest betweenness centrality scores
top_nodes = sorted(betweenness_scores, key=betweenness_scores.get, reverse=True)[:10]
for node in top_nodes:
    print(f"Node: {node}, Betweenness Centrality: {betweenness_scores[node]}") 

# Apply community detection algorithm using Louvain method
partition = nx.community.louvain_communities(G)


pos = nx.spring_layout(G)  # compute graph layout
nx.draw(G, pos, node_size=50, with_labels=False)  # draw nodes
nx.draw_networkx_edges(G, pos, edge_color='r', arrowsize=10)  # draw edges

plt.show()